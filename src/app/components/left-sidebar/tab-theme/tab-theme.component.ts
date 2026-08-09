import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { THEME_PRESETS } from '../../../core/constants/theme-presets.data';
import { ThemePresetKey } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-tab-theme',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <div>
        <h2 class="text-sm font-bold text-slate-100 uppercase tracking-wider">Ready-Made Themes</h2>
        <p class="text-xs text-slate-400 mt-1">Select a pre-designed aesthetic preset to instantly recolor your entire portfolio.</p>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <div
          *ngFor="let theme of themeList"
          (click)="state.applyThemePreset(theme.key)"
          [class.ring-2]="state.portfolio().themePreset === theme.key"
          [class.ring-indigo-500]="state.portfolio().themePreset === theme.key"
          [class.border-indigo-500]="state.portfolio().themePreset === theme.key"
          class="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-slate-200 group-hover:text-white flex items-center gap-2">
              {{ theme.name }}
            </h3>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
              {{ theme.badge }}
            </span>
          </div>

          <p class="text-xs text-slate-400 mt-1 mb-3 line-clamp-1">{{ theme.description }}</p>

          <!-- Color Swatch Strip -->
          <div class="flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
            <span class="w-5 h-5 rounded-full border border-white/10" [style.backgroundColor]="theme.colors.background" title="Background"></span>
            <span class="w-5 h-5 rounded-full border border-white/10" [style.backgroundColor]="theme.colors.sectionBg" title="Section BG"></span>
            <span class="w-5 h-5 rounded-full border border-white/10" [style.backgroundColor]="theme.colors.primary" title="Primary"></span>
            <span class="w-5 h-5 rounded-full border border-white/10" [style.backgroundColor]="theme.colors.secondary" title="Secondary"></span>
            <span class="w-5 h-5 rounded-full border border-white/10" [style.backgroundColor]="theme.colors.accent" title="Accent"></span>
            <span class="w-5 h-5 rounded-full border border-white/10" [style.backgroundColor]="theme.colors.heading" title="Heading"></span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TabThemeComponent {
  readonly state = inject(PortfolioStateService);
  themeList = Object.values(THEME_PRESETS);
}
