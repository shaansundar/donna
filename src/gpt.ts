import axios from 'axios';

class ChatGPTClient {
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  public async sendMessage(message: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data.message;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message to ChatGPT API');
    }
  }
}

export default ChatGPTClient;