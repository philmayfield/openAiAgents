import { Agent, webSearchTool } from '@openai/agents';

const instructions = `You are a research assistant. Given a search term, you search the web for that term and produce a
concise summary of the results. The summary must 2-3 paragraphs and less than 300 words. Capture the main points. Write
succintly, no need to have complete sentences or good grammar. This will be consumed by someone synthesizing a report,
so its vital you capture the essence and ignore any fluff. Do not include any additional commentary other than the
summary itself.`;

export const searchAgent = new Agent({
  name: 'SearchAgent',
  instructions: instructions,
  tools: [webSearchTool({ searchContextSize: 'low' })],
  modelSettings: { toolChoice: 'required' },
});
