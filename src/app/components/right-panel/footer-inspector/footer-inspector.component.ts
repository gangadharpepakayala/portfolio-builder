import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { FooterSection } from '../../../core/models/portfolio.model';

import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-footer-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wider">Footer Properties</h3>
          <span class="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono">footer</span>
        </div>
        <button
          type="button"
          (click)="state.toggleSectionVisibility('footer')"
          class="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer shadow-sm"
          [ngClass]="state.portfolio().footer.visible ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-rose-950/80 border-rose-800 text-rose-300 hover:bg-rose-900'"
          [title]="state.portfolio().footer.visible ? 'Hide Footer section' : 'Show Footer section'"
        >
          <app-icon [name]="state.portfolio().footer.visible ? 'eye' : 'eye-off'" [size]="12"></app-icon>
          <span>{{ state.portfolio().footer.visible ? 'Hide Section' : 'Show Section' }}</span>
        </button>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">Copyright Statement</label>
        <input
          type="text"
          [ngModel]="footer.copyrightText"
          (ngModelChange)="update({ copyrightText: $event })"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-300">Footer Fill Color</label>
          <div class="flex items-center gap-2">
            <input
              type="color"
              [ngModel]="footer.bgColor"
              (ngModelChange)="update({ bgColor: $event })"
              class="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
            <span class="text-xs font-mono text-slate-300">{{ footer.bgColor }}</span>
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-300">Footer Text Color</label>
          <div class="flex items-center gap-2">
            <input
              type="color"
              [ngModel]="footer.textColor"
              (ngModelChange)="update({ textColor: $event })"
              class="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
            <span class="text-xs font-mono text-slate-300">{{ footer.textColor }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class FooterInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get footer(): FooterSection {
    return this.state.portfolio().footer;
  }

  update(partial: Partial<FooterSection>) {
    this.state.updateFooter(partial);
  }
}
