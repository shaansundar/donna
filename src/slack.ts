import { WebClient, ChatPostMessageArguments, ConversationsHistoryArguments, Message } from '@slack/web-api';

class SlackBot {
  private webClient: WebClient;

  constructor(token: string) {
    this.webClient = new WebClient(token);
  }

  public async sendMessage(channel: string, message: string): Promise<void> {
    try {
      const options: ChatPostMessageArguments = {
        channel: channel,
        text: message,
      };

      await this.webClient.chat.postMessage(options);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  public async getMessages(channel: string): Promise<Message[]> {
    try {
      const options: ConversationsHistoryArguments = {
        channel: channel,
      };

      const response = await this.webClient.conversations.history(options);
      if (response.ok) {
        return response.messages as Message[];
      } else {
        throw new Error('Error retrieving messages from Slack');
      }
    } catch (error) {
      console.error('Error retrieving messages:', error);
      return [];
    }
  }
}

export default SlackBot;
