import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { ColorSettings } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-tab-colors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div>
        <h2 class="text-sm font-bold text-slate-100 uppercase tracking-wider">Color Customization</h2>
        <p class="text-xs text-slate-400 mt-1">Every element updates live in real-time without page reload.</p>
      </div>

      <div class="space-y-3">
        <div *ngFor="let item of colorFields" class="flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 transition-colors">
          <div>
            <div class="text-xs font-semibold text-slate-200">{{ item.label }}</div>
            <div class="text-[10px] text-slate-400">{{ item.desc }}</div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[11px] font-mono text-slate-300 uppercase">{{ getColorValue(item.key) }}</span>
            <input
              type="color"
              [value]="getColorValue(item.key)"
              (input)="onColorInput(item.key, $event)"
              class="w-8 h-8 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TabColorsComponent {
  readonly state = inject(PortfolioStateService);

  colorFields: Array<{ key: keyof ColorSettings; label: string; desc: string }> = [
    { key: 'primary', label: 'Primary Brand', desc: 'Main accent color for highlights and progress bars' },
    { key: 'secondary', label: 'Secondary Color', desc: 'Subheadings and minor badges' },
    { key: 'accent', label: 'Accent Color', desc: 'Eye-catching CTA buttons and icons' },
    { key: 'background', label: 'App Background', desc: 'Main page body background color' },
    { key: 'sectionBg', label: 'Section Background', desc: 'Alternating section block background' },
    { key: 'heading', label: 'Heading Text', desc: 'Titles, h1, h2, h3 headings' },
    { key: 'text', label: 'Body Text', desc: 'Paragraphs and descriptive text' },
    { key: 'link', label: 'Hyperlinks', desc: 'Link text color' },
    { key: 'button', label: 'Button Fill', desc: 'Primary call-to-action button background' },
    { key: 'buttonHover', label: 'Button Hover', desc: 'Hover state for buttons' },
    { key: 'cardBg', label: 'Card & Container', desc: 'Project, skill, and timeline cards' },
    { key: 'borderColor', label: 'Border & Dividers', desc: 'Container borders and horizontal rules' },
    { key: 'navbarBg', label: 'Navbar Background', desc: 'Top navigation bar background' },
    { key: 'footerBg', label: 'Footer Background', desc: 'Bottom footer section background' },
  ];

  getColorValue(key: keyof ColorSettings): string {
    return this.state.portfolio().colors[key] || '#ffffff';
  }

  onColorInput(key: keyof ColorSettings, event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.state.updateColors({ [key]: val });
  }
}
