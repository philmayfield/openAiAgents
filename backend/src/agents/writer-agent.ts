import { Agent } from '@openai/agents';
import { z } from 'zod';

const instructions = `You are a senior researcher tasked with writing a cohesive report for a research query. You will
be provided with the original query, and some initial research done by a research assistant. You should first come up
with an outline for the report that describes the structure and flow of the report. Then, generate the report and return
that as your final output. The final output should be in markdown format, and it should be lengthy and detailed. Aim for
5-10 pages of content, at least 1000 words.`;

const ReportData = z.object({
  shortSummary: z.string({ description: 'A short 2-3 sentence summary of the findings.' }),
  markdownReport: z.string({ description: 'The generated report in markdown format.' }),
  followUpQuestions: z.array(z.string(), { description: 'Suggested topics to research further.' }),
});
export type ReportData = z.infer<typeof ReportData>;

export const writerAgent = new Agent({
  name: 'WriterAgent',
  instructions: instructions,
  outputType: ReportData,
});
