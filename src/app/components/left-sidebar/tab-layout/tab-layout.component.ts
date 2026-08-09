import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { LayoutSettings } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-tab-layout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div>
        <h2 class="text-sm font-bold text-slate-100 uppercase tracking-wider">Layout & Spacing</h2>
        <p class="text-xs text-slate-400 mt-1">Configure global container widths, border radii, card shadows & animations.</p>
      </div>

      <!-- Container Width -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-slate-200">Max Container Width</label>
        <select
          [value]="state.portfolio().layout.containerWidth"
          (change)="onPropChange('containerWidth', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="max-w-5xl">Compact (1024px)</option>
          <option value="max-w-6xl">Standard (1152px)</option>
          <option value="max-w-7xl">Wide Desktop (1280px)</option>
          <option value="max-w-full">Full Width Edge-to-Edge</option>
        </select>
      </div>

      <!-- Section Spacing -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-slate-200">Section Vertical Padding</label>
        <select
          [value]="state.portfolio().layout.sectionSpacing"
          (change)="onPropChange('sectionSpacing', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="sm">Compact Padding (48px)</option>
          <option value="md">Balanced Padding (64px)</option>
          <option value="lg">Spacious Padding (96px)</option>
          <option value="xl">Luxurious Padding (128px)</option>
        </select>
      </div>

      <!-- Border Radius -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-slate-200">Card & Button Corner Radius</label>
        <select
          [value]="state.portfolio().layout.borderRadius"
          (change)="onPropChange('borderRadius', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="none">Square (0px)</option>
          <option value="sm">Subtle (4px)</option>
          <option value="md">Modern (8px)</option>
          <option value="lg">Soft Rounded (16px)</option>
          <option value="full">Pill Full Curve</option>
        </select>
      </div>

      <!-- Shadows -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-slate-200">Card Elevation / Shadow</label>
        <select
          [value]="state.portfolio().layout.shadow"
          (change)="onPropChange('shadow', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="none">Flat / No Shadow</option>
          <option value="sm">Subtle Elevation</option>
          <option value="md">Medium Shadow</option>
          <option value="lg">Prominent Floating Shadow</option>
        </select>
      </div>

      <!-- Animations -->
      <div class="space-y-1.5 pt-2 border-t border-slate-800">
        <div class="flex items-center justify-between">
          <label class="text-xs font-semibold text-slate-200">Enable Entry Animations</label>
          <input
            type="checkbox"
            [checked]="state.portfolio().layout.animationsEnabled"
            (change)="toggleAnimations($event)"
            class="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
        </div>
      </div>
    </div>
  `,
})
export class TabLayoutComponent {
  readonly state = inject(PortfolioStateService);

  onPropChange(prop: keyof LayoutSettings, event: Event) {
    const val = (event.target as HTMLSelectElement).value as any;
    this.state.updateLayout({ [prop]: val });
  }

  toggleAnimations(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.state.updateLayout({ animationsEnabled: checked });
  }
}
