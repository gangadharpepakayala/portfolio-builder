import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { LivePortfolioComponent } from '../live-portfolio/live-portfolio.component';
import { PortfolioStateService } from '../../core/services/portfolio-state.service';

@Component({
  selector: 'app-editor-workspace',
  standalone: true,
  imports: [CommonModule, SidePanelComponent, LivePortfolioComponent],
  template: `
    <div class="flex-1 flex h-[calc(100vh-4rem)] overflow-hidden relative select-none animate-editor-entrance">
      <!-- Main Panel: Live Portfolio Preview Canvas -->
      <main class="flex-1 h-full overflow-y-auto bg-slate-950 p-4 sm:p-6 lg:p-8 custom-scrollbar">
        <div
          class="mx-auto transition-all duration-300 min-h-full rounded-2xl shadow-2xl overflow-hidden border border-slate-800"
          [class.max-w-7xl]="!state.previewMode()"
          [class.max-w-full]="state.previewMode()"
        >
          <app-live-portfolio></app-live-portfolio>
        </div>
      </main>

      <!-- Side Panel: Unified Elements & Styles Inspector -->
      <app-side-panel *ngIf="!state.previewMode()"></app-side-panel>
    </div>
  `,
})
export class EditorWorkspaceComponent {
  readonly state = inject(PortfolioStateService);
}
