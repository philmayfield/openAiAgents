import { Body, Controller, Post, Sse, MessageEvent, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResearchService } from './research.service';

type ResearchResult = {
  result: string;
};

@Controller('api/research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Post()
  async research(@Body('query') query: string): Promise<ResearchResult> {
    if (!query) {
      throw new Error('Query is required');
    }

    return { result: await this.researchService.performResearch(query) };
  }

  @Sse('stream')
  researchStream(@Query('query') query: string): Observable<MessageEvent> {
    if (!query) {
      throw new Error('Query is required');
    }

    return this.researchService.performResearchWithStream(query);
  }
}
