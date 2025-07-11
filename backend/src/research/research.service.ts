import { Injectable, MessageEvent } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { ResearchManager } from './research-manager';

@Injectable()
export class ResearchService {
  private researchManager = new ResearchManager();

  async performResearch(query: string): Promise<string> {
    try {
      return await this.researchManager.run(query);
    } catch (error) {
      console.error('Error performing research:', error);
      throw new Error('Failed to perform research: ' + error.message);
    }
  }

  performResearchWithStream(query: string): Observable<MessageEvent> {
    const subject = new Subject<MessageEvent>();

    const statusCallback = (status: string, stage: string, progress?: number) => {
      const timestamp = new Date().toISOString();
      const data = JSON.stringify({ status, stage, progress, timestamp });
      const event: MessageEvent = { data };

      subject.next(event);
    };

    // Start the research process
    this.researchManager
      .runWithCallback(query, statusCallback)
      .then(result => {
        const timestamp = new Date().toISOString();
        const data = JSON.stringify({ status: 'Complete', stage: 'done', result, timestamp });
        const event: MessageEvent = { data };

        // Send final result
        subject.next(event);
        subject.complete();
      })
      .catch(error => {
        const timestamp = new Date().toISOString();
        const data = JSON.stringify({
          status: 'Error',
          stage: 'error',
          error: error.message,
          timestamp,
        });
        const event: MessageEvent = { data };

        subject.next(event);
        subject.complete();
      });

    return subject.asObservable();
  }
}
