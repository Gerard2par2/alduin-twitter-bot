import GptService from "../src/services/gpt.service";

export class GptServiceTest {
    
    private constructor() {}

    private static async testGenerateChatTweet(gptService: GptService): Promise<boolean> {
        return (await gptService.generateChatTweet()).type !== 'error'
    }

    public static async test(gptService: GptService): Promise<void> {
        let success = await this.testGenerateChatTweet(gptService);

        if(success) {
            console.log('>> Tests passed.');
        } else {
            console.log('>> Error in testGenerateChatTweet');
            console.log('>> Ttests failed.');
        }
    }
}