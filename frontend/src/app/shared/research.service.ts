import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

type ResearchResult = {
  result: string;
};

type ResearchStatus = {
  status: string;
  stage: string;
  progress?: number;
  result?: string;
  error?: string;
  timestamp: string;
};

@Injectable({ providedIn: 'root' })
export class ResearchService {
  result = signal('');
  isLoading = signal(false);
  currentStatus = signal('');
  currentStage = signal('');
  progress = signal(0);
  private http = inject(HttpClient);
  private readonly rootUrl = 'http://localhost:3001/api/research';

  sendResearchRequest(researchRequest: string, control: FormControl): void {
    this.sendRequest(researchRequest, control);
  }

  sendResearchRequestWithStream(researchRequest: string, control: FormControl): void {
    this.sendStreamRequest(researchRequest, control);
  }

  private async sendRequest(query: string, control: FormControl): Promise<void> {
    this.isLoading.set(true);
    this.http.post<ResearchResult>(`${this.rootUrl}`, { query }).subscribe({
      next: res => {
        this.result.set(res.result);
        control.reset('');
        console.log('Research result:', res.result);
      },
      error: err => {
        this.result.set('Error: ' + (err instanceof Error ? err.message : 'Unknown error'));
        console.error('Error performing research:', err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  private sendStreamRequest(query: string, control: FormControl): void {
    this.isLoading.set(true);
    this.result.set('');
    this.currentStatus.set('Starting research...');
    this.currentStage.set('initializing');
    this.progress.set(0);
    control.disable();

    const eventSource = new EventSource(
      `${this.rootUrl}/stream?query=${encodeURIComponent(query)}`,
    );

    eventSource.onmessage = event => {
      try {
        const data: ResearchStatus = JSON.parse(event.data);

        this.currentStatus.set(data.status);
        this.currentStage.set(data.stage);

        if (data.progress !== undefined) {
          this.progress.set(data.progress);
        }

        if (data.result) {
          this.result.set(data.result);
          control.reset('');
        }

        if (data.error) {
          this.result.set('Error: ' + data.error);
        }

        if (data.stage === 'done' || data.stage === 'error') {
          this.isLoading.set(false);
          eventSource.close();
          control.enable();
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = error => {
      console.error('SSE connection error:', error);
      this.currentStatus.set('Connection error');
      this.isLoading.set(false);
      eventSource.close();
    };
  }

  getDinosMarkdown(): Observable<string> {
    // The file is served at /dinos.md from the public directory
    return this.http.get('/dinos.md', { responseType: 'text' }).pipe(first());
  }
}
