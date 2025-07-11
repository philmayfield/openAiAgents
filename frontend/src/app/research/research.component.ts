import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ResearchService } from '../shared/research.service';
import { MarkdownComponent } from 'ngx-markdown';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-research',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MarkdownComponent,
    MatProgressBarModule,
  ],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResearchComponent {
  private researchService = inject(ResearchService);

  researchQueryControl = new FormControl('');
  result = computed(() => this.researchService.result());
  hasResult = computed(() => this.result() !== '');
  currentStatus = computed(() => this.researchService.currentStatus());
  progress = computed(() => this.researchService.progress());
  isLoading = computed(() => this.researchService.isLoading());

  onSubmit(): void {
    const value = this.researchQueryControl.value?.trim();

    if (this.isLoading() || !value) {
      return;
    }

    this.researchService.sendResearchRequestWithStream(value, this.researchQueryControl);
  }
}
