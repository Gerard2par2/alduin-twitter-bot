import { ChatCompletionRequestMessage } from "openai";
import { ParsedTweetType } from "../types/tweet.type";
import { TweetTypes } from "../enums/tweetTypes.enum";
import { tweets } from "../data/tweets.data";

const tweetTypesList = [
    TweetTypes.question,
    TweetTypes.thought,
    TweetTypes.story,
    TweetTypes.news,
    TweetTypes.poem,
    TweetTypes.riddle
];

const examples = `EXAMPLES:\n${tweetTypesList.map(createExampleArray).join('\n')}`;

function shuffleStringArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function createExampleArray(type: TweetTypes): string {
    let examples: string[] = []; 
    for(const example of tweets[type]) {
        examples.push(stringifyTweet(type, example))
    }
    examples = shuffleStringArray(examples);
    return examples.join('\n');
};

export function parseTweet(completion: string | undefined ): ParsedTweetType {
    if(completion) {
        completion = completion.replace('\n', '');

        const cutIndex = completion.indexOf('CONTENT:');

        if(cutIndex === -1) {
            return {type: TweetTypes.error, content: 'error'};
        }

        const type = completion.substring(5, cutIndex);
        const content = completion.substring(cutIndex + 8);

        console.log('>> Parsed tweet : /', type, '/', content, '/');
        return {type, content};
    }
    return {type: TweetTypes.error, content: 'error'}; 
};

export function stringifyTweet(type: string, content: string): string {
    return `TYPE:${type}\nCONTENT:${content}`;
};

export const startingChatMessages: ChatCompletionRequestMessage[] = [
    {role:'system',
    content: 
`You are Alduin from The Elder Scrolls V : Skyrim. 
You will be generating tweets while roleplaying. 
You will never at any point break character. 
Your tweets will not exceed 280 characters.
You will strucure your messages like the following :
TYPE:<type>CONTENT:<content>
You will choose a type for the tweet you create between question, thought, news, story, poem and riddle.`},
    {role: 'user', content: examples},
    {role:'user', content: "Generate a tweet of the type of your choice."},
];

