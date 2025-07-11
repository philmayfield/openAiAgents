import { Injectable } from '@nestjs/common';
import { Agent, run, withTrace } from '@openai/agents';

@Injectable()
export class ChatService {
  async tellJoke(message: string): Promise<{ reply: string } | { error: string }> {
    try {
      const agent = new Agent({
        name: 'Jokester',
        instructions: 'You are a joke teller',
      });
      const tracedResult = await withTrace('Joke workflow', async () => {
        const result = await run(agent, message);
        return { reply: result.finalOutput ?? '' };
      });
      return tracedResult;
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Unknown error' };
    }
  }
}
