import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { ZipExportService } from '../../../core/services/zip-export.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-tab-export',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="space-y-4">
      <div>
        <h2 class="text-sm font-bold text-slate-100 uppercase tracking-wider">Export Portfolio</h2>
        <p class="text-xs text-slate-400 mt-1">Download a zero-dependency, self-contained static website package ready to publish anywhere.</p>
      </div>

      <div class="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/30 space-y-3">
        <div class="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wide">
          <app-icon name="file-archive" [size]="16"></app-icon> Standalone ZIP Package
        </div>
        <p class="text-xs text-slate-300">
          Generates clean HTML5, CSS (with custom color variables & responsive breakpoints), vanilla JS, fonts, and assets folder structure.
        </p>

        <ul class="text-xs text-slate-400 space-y-1.5 list-disc list-inside pt-1">
          <li><strong class="text-slate-200">index.html</strong> (Semantic HTML5 markup)</li>
          <li><strong class="text-slate-200">css/style.css</strong> & <strong class="text-slate-200">responsive.css</strong></li>
          <li><strong class="text-slate-200">js/script.js</strong> (Mobile nav toggle & smooth scroll)</li>
          <li><strong class="text-slate-200">README.md</strong> (Netlify, Vercel & GitHub Pages deployment guide)</li>
        </ul>

        <button
          (click)="exportZip()"
          [disabled]="isExporting"
          class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <app-icon name="download" [size]="16"></app-icon>
          <span>{{ isExporting ? 'Generating ZIP...' : 'Download Portfolio.zip' }}</span>
        </button>
      </div>
    </div>
  `,
})
export class TabExportComponent {
  readonly state = inject(PortfolioStateService);
  private readonly zipService = inject(ZipExportService);
  isExporting = false;

  async exportZip() {
    this.isExporting = true;
    try {
      await this.zipService.exportPortfolioZip(this.state.portfolio());
    } catch (e) {
      console.error('Export ZIP error:', e);
    } finally {
      this.isExporting = false;
    }
  }
}
