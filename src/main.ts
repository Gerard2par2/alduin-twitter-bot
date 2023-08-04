import { TweetTypes } from "./enums/tweetTypes.enum";
import GptService from "./services/gpt.service";
import { EnvType } from "./types/env.type";
import { parseTweet, stringifyTweet } from "./utils/utils";

const env = require('../private/env.json') as EnvType;
const gptService = new GptService(env);

const test = async () => {
    let testFailed = false
    for (let i = 0; i < 4; i++) {
        console.log('----------\n>> Iteration ' + i);
        console.log('>> Starting tweet generation...')
        
        const tweet = await gptService.generateChatTweet();
        
        console.log('>> Output:');

        if(tweet?.type && tweet.type !== TweetTypes.error) {
            console.log('/', tweet.type, '/', tweet.content, '/', tweet.content.length, '/') 
        } else {
            console.log('>> Tweet generation failed, tweet = ' + JSON.stringify(tweet) + '');
            testFailed = true;
        }
    }
    
    console.log('----------\n>> Full conversation :');

    gptService.printFullConv();
    
    if(testFailed) {
        console.log('>> Test failed.');
    } else {
        console.log('>> Test succeeded.');
    }
}

// gptService.printFullConv();

test();

// const content = "In the darkness I rise, wings spread wide,\nAlduin the World-Eater, with unstoppable stride.\nFrom Sovngarde to Tamriel, my hunger unfurled,\nFor I am the devourer, the end of this world. #Poetry #Alduin"
// const type = "poem"
// console.log(parseTweet(stringifyTweet(type, content)));