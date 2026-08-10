import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { TypographySettings } from '../../../core/models/portfolio.model';

interface FontOption {
  name: string;
  category: string;
  fallback: string;
}

@Component({
  selector: 'app-tab-typography',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-5">
      <div>
        <h2 class="text-sm font-extrabold text-indigo-400 uppercase tracking-wider">Typography & Fonts</h2>
        <p class="text-xs text-slate-400 mt-1">Select from 15 distinct Google Fonts and adjust text sizing, spacing & weights.</p>
      </div>

      <!-- Font Family Grid Picker -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-slate-200">Font Family (Google Fonts)</label>
          <span class="text-[10px] font-mono text-indigo-300 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Active: {{ state.portfolio().typography.fontFamily }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
          <button
            *ngFor="let font of fontOptions"
            (click)="selectFont(font.name)"
            [class.bg-indigo-600]="state.portfolio().typography.fontFamily === font.name"
            [class.border-indigo-500]="state.portfolio().typography.fontFamily === font.name"
            [class.text-white]="state.portfolio().typography.fontFamily === font.name"
            [class.bg-slate-900]="state.portfolio().typography.fontFamily !== font.name"
            [class.text-slate-300]="state.portfolio().typography.fontFamily !== font.name"
            class="p-3 rounded-xl border border-slate-800 hover:border-slate-700 text-left transition-all cursor-pointer shadow-sm relative group"
          >
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-xs font-extrabold truncate" [style.fontFamily]="font.name + ', ' + font.fallback">
                {{ font.name }}
              </span>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 uppercase tracking-wider font-sans font-bold shrink-0 opacity-80">
                {{ font.category }}
              </span>
            </div>
            <div
              class="text-xs tracking-normal opacity-90 line-clamp-1"
              [style.fontFamily]="font.name + ', ' + font.fallback"
            >
              Aa Bb Cc 123
            </div>
          </button>
        </div>
      </div>

      <!-- Heading Size -->
      <div class="space-y-1.5 pt-3 border-t border-slate-800">
        <label class="text-xs font-bold text-slate-200">Heading Size</label>
        <select
          [value]="state.portfolio().typography.headingSize"
          (change)="onPropChange('headingSize', $event)"
          class="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
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
        <label class="text-xs font-bold text-slate-200">Paragraph Body Size</label>
        <select
          [value]="state.portfolio().typography.paragraphSize"
          (change)="onPropChange('paragraphSize', $event)"
          class="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
        >
          <option value="sm">Small (14px)</option>
          <option value="md">Medium (16px)</option>
          <option value="lg">Large (18px)</option>
        </select>
      </div>

      <!-- Line Height -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-200">Line Height</label>
        <select
          [value]="state.portfolio().typography.lineHeight"
          (change)="onPropChange('lineHeight', $event)"
          class="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
        >
          <option value="tight">Tight (1.2)</option>
          <option value="normal">Normal (1.6)</option>
          <option value="relaxed">Relaxed (1.8)</option>
          <option value="loose">Loose (2.0)</option>
        </select>
      </div>

      <!-- Letter Spacing -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-200">Letter Spacing</label>
        <select
          [value]="state.portfolio().typography.letterSpacing"
          (change)="onPropChange('letterSpacing', $event)"
          class="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
        >
          <option value="tight">Tight (-0.02em)</option>
          <option value="normal">Normal (0em)</option>
          <option value="wide">Wide (+0.05em)</option>
        </select>
      </div>

      <!-- Font Weight -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-200">Heading Weight</label>
        <select
          [value]="state.portfolio().typography.fontWeight"
          (change)="onPropChange('fontWeight', $event)"
          class="w-full bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
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
export class TabTypographyComponent implements OnInit {
  readonly state = inject(PortfolioStateService);

  fontOptions: FontOption[] = [
    { name: 'Inter', category: 'Modern', fallback: 'sans-serif' },
    { name: 'Poppins', category: 'Geometric', fallback: 'sans-serif' },
    { name: 'Roboto', category: 'Clean', fallback: 'sans-serif' },
    { name: 'Montserrat', category: 'Bold Caps', fallback: 'sans-serif' },
    { name: 'Outfit', category: 'Tech UI', fallback: 'sans-serif' },
    { name: 'Nunito', category: 'Rounded', fallback: 'sans-serif' },
    { name: 'Lato', category: 'Humanist', fallback: 'sans-serif' },
    { name: 'Space Grotesk', category: 'Cyber', fallback: 'sans-serif' },
    { name: 'Plus Jakarta Sans', category: 'Startup', fallback: 'sans-serif' },
    { name: 'Playfair Display', category: 'Editorial', fallback: 'serif' },
    { name: 'Syne', category: 'Futuristic', fallback: 'sans-serif' },
    { name: 'Fira Code', category: 'Monospace', fallback: 'monospace' },
    { name: 'Raleway', category: 'Elegant', fallback: 'sans-serif' },
    { name: 'Oswald', category: 'Condensed', fallback: 'sans-serif' },
    { name: 'DM Sans', category: 'Minimal', fallback: 'sans-serif' },
  ];

  ngOnInit() {
    this.ensureGoogleFontLoaded(this.state.portfolio().typography.fontFamily);
  }

  selectFont(fontName: string) {
    this.ensureGoogleFontLoaded(fontName);
    this.state.updateTypography({ fontFamily: fontName });
  }

  ensureGoogleFontLoaded(fontName: string) {
    if (!fontName) return;
    const fontId = `google-font-${fontName.toLowerCase().replace(/\s+/g, '-')}`;
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      const encodedFont = encodeURIComponent(fontName);
      link.href = `https://fonts.googleapis.com/css2?family=${encodedFont}:wght@300;400;500;600;700;800;900&display=swap`;
      document.head.appendChild(link);
    }
  }

  onPropChange(prop: keyof TypographySettings, event: Event) {
    const val = (event.target as HTMLSelectElement).value as any;
    this.state.updateTypography({ [prop]: val });
  }
}
