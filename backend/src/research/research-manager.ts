import { run, withTrace } from '@openai/agents';
import { plannerAgent, WebSearchItem } from 'src/agents/planner-agent';
import { WebSearchPlan } from 'src/agents/planner-agent';
import { searchAgent } from 'src/agents/search-agent';
import { ReportData, writerAgent } from 'src/agents/writer-agent';

type StatusCallback = (status: string, stage: string, progress?: number) => void;

export class ResearchManager {
  async run(query: string): Promise<string> {
    return await withTrace('Research trace', async () => {
      const searchPlan = await this.planSearches(query);
      const searchResults = await this.performSearches(searchPlan);
      const report = await this.writeReport(query, searchResults);
      const markdownReport = report.markdownReport;

      return markdownReport;
    });
  }

  async runWithCallback(query: string, onStatusUpdate: StatusCallback): Promise<string> {
    return await withTrace('Research trace', async () => {
      onStatusUpdate('Planning searches...', 'planning', 10);
      const searchPlan = await this.planSearches(query, onStatusUpdate);

      onStatusUpdate('Performing searches...', 'searching', 30);
      const searchResults = await this.performSearches(searchPlan, onStatusUpdate);

      onStatusUpdate('Writing the report...', 'writing', 80);
      const report = await this.writeReport(query, searchResults, onStatusUpdate);

      onStatusUpdate('Finalizing...', 'finalizing', 95);
      const markdownReport = report.markdownReport;

      return markdownReport;
    });
  }

  private async planSearches(
    query: string,
    onStatusUpdate?: StatusCallback,
  ): Promise<WebSearchPlan> {
    try {
      const result = await run(plannerAgent, query);
      return result.finalOutput ?? { searches: [] };
    } catch (error) {
      console.error('Error during search planning:', error);
      return { searches: [] };
    }
  }

  private async search(item: WebSearchItem): Promise<string> {
    const searchInput = `Search term: ${item.query}\nReason for searching: ${item.reason}`;

    try {
      const result = await run(searchAgent, searchInput);
      return result.finalOutput?.toString() ?? '';
    } catch (error) {
      console.error('Error during search:', error);

      return '';
    }
  }

  private async writeReport(
    query: string,
    searchResults: string[],
    onStatusUpdate?: StatusCallback,
  ): Promise<ReportData> {
    const reportInput = `Original query: ${query}\nSummarized search results: ${searchResults.join('\n')}`;

    try {
      const result = await run(writerAgent, reportInput);

      if (!result.finalOutput) {
        throw new Error('Writer agent returned no output');
      }

      return result.finalOutput;
    } catch (error) {
      console.error('Error during report writing:', error);
      throw error;
    }
  }

  private async performSearches(
    searchPlan: WebSearchPlan,
    onStatusUpdate?: StatusCallback,
  ): Promise<string[]> {
    const searches = searchPlan.searches;

    const results: string[] = [];

    for (let i = 0; i < searches.length; i++) {
      const search = searches[i];

      onStatusUpdate?.(`Searching: ${search.query}`, 'searching', 30 + (i / searches.length) * 40);

      const result = await this.search(search);

      results.push(result);
    }

    return results;
  }
}
