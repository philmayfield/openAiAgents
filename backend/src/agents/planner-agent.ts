import { Agent } from '@openai/agents';
import { z } from 'zod';

const howManySearches = 3;

const instructions = `You are a helpful research assistant. Given a query, come up with a set of web searches to perform to best answer the query. Output ${howManySearches} terms to query for.`;

// Zod schema for search query with reason
const WebSearchItemSchema = z.object({
  reason: z.string({
    description: 'Your reasoning for why this search is important to the query.',
  }),
  query: z.string({ description: 'The search term to use for the web search.' }),
});
export type WebSearchItem = z.infer<typeof WebSearchItemSchema>;

const WebSearchPlanSchema = z.object({
  searches: z.array(WebSearchItemSchema, {
    description: 'A list of web searches to perform to best answer the query.',
  }),
});
export type WebSearchPlan = z.infer<typeof WebSearchPlanSchema>;

export const plannerAgent = new Agent({
  name: 'PlannerAgent',
  instructions: instructions,
  outputType: WebSearchPlanSchema,
});
