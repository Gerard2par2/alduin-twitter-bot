import { TweetTypes } from "../src/enums/tweetTypes.enum";
import { parseTweet } from "../src/utils/utils";

export class UtilsTest {
    
    private constructor() {}

    private static testParseTweet(): boolean {
        // TODO : add more tests
        const validCompletions = [
            'TYPE:joke\nCONTENT:Why did the dragon cross the road?',
            'TYPE:thought\nCONTENT:Maybe I should try being nice?',
            'TYPE:news\nCONTENT:Dragons sighted in the northern skies!'
        ];
        
        const invalidCompletions = [
            'TYPE:invalidContent',
            'TWEET:random\nCONTENT:"Another random content"',
            'TYPE:thought\nMISSING:This won\'t work.',
            'TYPE:poemCONTENT:Roses are red, dragons are cool.'
        ];
        
        let success = false;
        
        for (const completion of validCompletions) {
            const parsedTweet = parseTweet(completion);
            if(parsedTweet.type === TweetTypes.error) {
                console.log('>> Error parsing valid completion : ' + completion);
                success = false;
            }
        }
        
        for (const completion of invalidCompletions) {
            const parsedTweet = parseTweet(completion);
            if(parsedTweet.type !== TweetTypes.error) {
                console.log('>> Error parsing invalid completion : ' + completion);
                success = false;
            }
        }
        return success;
    }

    private static testStringifyTweet(): boolean {
        const tweet = {type: 'test', content: 'test'};
        const stringifiedTweet = JSON.stringify(tweet);
        return stringifiedTweet === `TYPE:${tweet.type}\nCONTENT:${tweet.content}`;
    }

    public static test(): void {    
        let success = true;
        
        if(!this.testParseTweet()) {
            success = false;
            console.log('>> Error in testParseTweet');
        }

        if(!this.testStringifyTweet()) {
            success = false;
            console.log('>> Error in testStringifyTweet');
        }

        if(success) {
            console.log('>> All tests passed.');
        } else {
            console.log('>> Some tests failed.');
        }
    }
}