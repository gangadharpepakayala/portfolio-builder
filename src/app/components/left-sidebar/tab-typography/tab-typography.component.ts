import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { TypographySettings } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-tab-typography',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div>
        <h2 class="text-sm font-bold text-slate-100 uppercase tracking-wider">Typography & Fonts</h2>
        <p class="text-xs text-slate-400 mt-1">Select Google Fonts and adjust text sizing, spacing & weights.</p>
      </div>

      <!-- Font Family Picker -->
      <div class="space-y-2">
        <label class="text-xs font-semibold text-slate-200">Font Family (Google Fonts)</label>
        <div class="grid grid-cols-2 gap-2">
          <button
            *ngFor="let font of fonts"
            (click)="selectFont(font)"
            [class.bg-indigo-600]="state.portfolio().typography.fontFamily === font"
            [class.border-indigo-500]="state.portfolio().typography.fontFamily === font"
            [class.text-white]="state.portfolio().typography.fontFamily === font"
            [class.bg-slate-900]="state.portfolio().typography.fontFamily !== font"
            [class.text-slate-300]="state.portfolio().typography.fontFamily !== font"
            class="p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-left transition-all"
          >
            <div class="text-xs font-bold" [style.fontFamily]="font">{{ font }}</div>
            <div class="text-[10px] opacity-70">Aa Bb Cc 123</div>
          </button>
        </div>
      </div>

      <!-- Heading Size -->
      <div class="space-y-1.5 pt-2 border-t border-slate-800">
        <label class="text-xs font-semibold text-slate-200">Heading Size</label>
        <select
          [value]="state.portfolio().typography.headingSize"
          (change)="onPropChange('headingSize', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="sm">Small (Compact)</option>
          <option value="md">Medium (Balanced)</option>
          <option value="lg">Large (Prominent)</option>
          <option value="xl">Extra Large (Bold Impact)</option>
          <option value="2xl">Massive Hero</option>
        </select>
      </div>

      <!-- Paragraph Size -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-slate-200">Paragraph Body Size</label>
        <select
          [value]="state.portfolio().typography.paragraphSize"
          (change)="onPropChange('paragraphSize', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="sm">Small (14px)</option>
          <option value="md">Medium (16px)</option>
          <option value="lg">Large (18px)</option>
        </select>
      </div>

      <!-- Line Height -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-slate-200">Line Height</label>
        <select
          [value]="state.portfolio().typography.lineHeight"
          (change)="onPropChange('lineHeight', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="tight">Tight (1.2)</option>
          <option value="normal">Normal (1.6)</option>
          <option value="relaxed">Relaxed (1.8)</option>
          <option value="loose">Loose (2.0)</option>
        </select>
      </div>

      <!-- Letter Spacing -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-slate-200">Letter Spacing</label>
        <select
          [value]="state.portfolio().typography.letterSpacing"
          (change)="onPropChange('letterSpacing', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="tight">Tight (-0.02em)</option>
          <option value="normal">Normal (0em)</option>
          <option value="wide">Wide (+0.05em)</option>
        </select>
      </div>

      <!-- Font Weight -->
      <div class="space-y-1.5">
        <label class="text-xs font-semibold text-slate-200">Heading Weight</label>
        <select
          [value]="state.portfolio().typography.fontWeight"
          (change)="onPropChange('fontWeight', $event)"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          <option value="normal">Regular (400)</option>
          <option value="medium">Medium (500)</option>
          <option value="semibold">SemiBold (600)</option>
          <option value="bold">Bold (700)</option>
        </select>
      </div>
    </div>
  `,
})
export class TabTypographyComponent {
  readonly state = inject(PortfolioStateService);

  fonts: Array<TypographySettings['fontFamily']> = [
    'Inter',
    'Poppins',
    'Roboto',
    'Montserrat',
    'Outfit',
    'Nunito',
    'Lato',
    'Space Grotesk',
  ];

  selectFont(font: TypographySettings['fontFamily']) {
    this.state.updateTypography({ fontFamily: font });
  }

  onPropChange(prop: keyof TypographySettings, event: Event) {
    const val = (event.target as HTMLSelectElement).value as any;
    this.state.updateTypography({ [prop]: val });
  }
}
