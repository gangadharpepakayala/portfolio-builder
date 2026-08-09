import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { ExperienceItem, ExperienceSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-experience-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-5">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">Experience Section & Cards</h3>
        <button
          (click)="addExperience()"
          class="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
        >
          <app-icon name="plus" [size]="14"></app-icon> Add Experience Card
        </button>
      </div>

      <!-- Title & Title Color -->
      <div class="space-y-1.5">
        <div class="flex justify-between items-center">
          <label class="text-xs font-bold text-slate-200">Section Title</label>
          <div class="flex items-center gap-1.5">
            <span class="text-xs text-slate-400">Title Color</span>
            <input
              type="color"
              [value]="expSection.titleColor || state.portfolio().colors.heading"
              (input)="updateSection({ titleColor: $any($event.target).value })"
              class="w-7 h-7 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
          </div>
        </div>
        <input
          type="text"
          [ngModel]="expSection.title"
          (ngModelChange)="updateSection({ title: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Subtitle -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-200">Subtitle</label>
        <input
          type="text"
          [ngModel]="expSection.subtitle"
          (ngModelChange)="updateSection({ subtitle: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Experience Cards List -->
      <div class="space-y-4 pt-2">
        <div
          *ngFor="let item of expSection.experiences; let i = index"
          class="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-3 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-slate-200">#{{ i + 1 }} {{ item.role || 'Job Role' }}</span>
            <button
              (click)="deleteExperience(item.id, item.company || item.role)"
              class="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Delete Experience Entry"
            >
              <app-icon name="trash-2" [size]="16"></app-icon>
            </button>
          </div>

          <div class="space-y-2.5">
            <input
              type="text"
              placeholder="Job Role / Position"
              [ngModel]="item.role"
              (ngModelChange)="updateExpItem(item.id, { role: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs font-bold text-slate-100 rounded-lg p-2.5"
            />

            <div class="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Company Name"
                [ngModel]="item.company"
                (ngModelChange)="updateExpItem(item.id, { company: $event })"
                class="bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-100 rounded-lg p-2.5"
              />
              <input
                type="text"
                placeholder="Duration (2023 - Present)"
                [ngModel]="item.duration"
                (ngModelChange)="updateExpItem(item.id, { duration: $event })"
                class="bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 rounded-lg p-2.5"
              />
            </div>

            <!-- Increased Min Height & Rows for Experience Description -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-400">Job Description & Accomplishments</label>
              <textarea
                rows="5"
                placeholder="Job description and key achievements..."
                [ngModel]="item.description"
                (ngModelChange)="updateExpItem(item.id, { description: $event })"
                class="w-full min-h-[120px] bg-slate-950 border border-slate-700 text-xs text-slate-100 rounded-lg p-3 focus:outline-none focus:border-indigo-500 leading-relaxed"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ExperienceInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get expSection(): ExperienceSection {
    return this.state.portfolio().experience;
  }

  updateSection(partial: Partial<ExperienceSection>) {
    this.state.updateExperience(partial);
  }

  addExperience() {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      company: 'Tech Company Inc.',
      role: 'Senior Software Engineer',
      duration: '2022 - Present',
      location: 'Remote',
      description: 'Designing and scaling responsive web architectures, microservices, and modern UI components.',
      logo: '',
      technologies: ['Angular', 'TypeScript', 'Node.js', 'TailwindCSS'],
    };
    this.updateSection({
      experiences: [...this.expSection.experiences, newExp],
    });
  }

  deleteExperience(id: string, name: string) {
    if (confirm(`Are you sure you want to delete the experience entry for '${name || 'Job Role'}'?`)) {
      this.updateSection({
        experiences: this.expSection.experiences.filter((e) => e.id !== id),
      });
    }
  }

  updateExpItem(id: string, partial: Partial<ExperienceItem>) {
    const updated = this.expSection.experiences.map((e) => (e.id === id ? { ...e, ...partial } : e));
    this.updateSection({ experiences: updated });
  }
}
