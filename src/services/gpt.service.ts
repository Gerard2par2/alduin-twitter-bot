import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import { EnvType as EnvDataType } from "../types/env.type";
import { ParsedTweetType } from "../types/tweet.type";
import { startingChatMessages, parseTweet, stringifyTweet } from "../utils/utils";

export default class GptService {
    static printFullConv() {
        throw new Error("Method not implemented.");
    }
    private readonly openAI: OpenAIApi;
    private readonly model: string;
    private readonly temperature: number;

    private readonly chatMessages: ChatCompletionRequestMessage[];

    constructor (env: EnvDataType) {
 
        const openAiConfiguration = new Configuration({
            apiKey: env.openAI.key,
        });
 
        this.openAI = new OpenAIApi(openAiConfiguration);
 
        this.model = env.openAI.model;
        this.temperature = env.openAI.temperature;

        
        this.chatMessages = startingChatMessages;
    }

    async generateChatTweet(recursionCount: number = 0): Promise<ParsedTweetType> {
        // Generate a tweet using a chat prompt

        // Fetch the completion from the OpenAI API
        const completion = await this.openAI.createChatCompletion({
            model: this.model,
            messages: this.chatMessages,
            temperature: this.temperature,
        });

        const completionContent = completion.data.choices[0].message?.content as string;

        const parsedTweet = parseTweet(completionContent);

        if (parsedTweet.content.length > 280) {
            console.warn('Tweet is too long, retrying...');
            return await this.handleError(recursionCount + 1, 'Your tweet is longer than 280 characters. Please rewrite it more shortly.', completionContent);
        } else if(parsedTweet.type === 'error') {
            console.warn('Error in completion structure, retrying...');
            return await this.handleError(recursionCount + 1, 'There was an error in your json structure. Please reformat the tweet properly.', completionContent);
        } 

        this.chatMessages.push({role:'assistant', content: stringifyTweet(parsedTweet.type, parsedTweet.content)});
        this.chatMessages.push({role:'user', content: 'Great ! now, give me another tweet of the type of your choice.'});

        return parsedTweet;
    }

    private async handleError(recursionCount: number, message: string, lastCompletion: string): Promise<ParsedTweetType> {
        this.chatMessages.push({role:'user', content: `${message} Your last completion was : ${lastCompletion}`});
        if(recursionCount < 4) {
            return await this.generateChatTweet(recursionCount + 1);
        }
        return {type:'error', content:'error'};
    }

    printFullConv(): void {
        console.log(this.chatMessages);
    }
}