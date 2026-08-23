import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { EducationItem, EducationSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-education-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wider">Education Section</h3>
        <div class="flex items-center gap-2">
          <button
            type="button"
            (click)="state.toggleSectionVisibility('education')"
            class="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer shadow-sm"
            [ngClass]="state.portfolio().education.visible ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-rose-950/80 border-rose-800 text-rose-300 hover:bg-rose-900'"
            [title]="state.portfolio().education.visible ? 'Hide Education section' : 'Show Education section'"
          >
            <app-icon [name]="state.portfolio().education.visible ? 'eye' : 'eye-off'" [size]="12"></app-icon>
            <span>{{ state.portfolio().education.visible ? 'Hide Section' : 'Show Section' }}</span>
          </button>
          <button
            (click)="addEdu()"
            class="flex items-center gap-1 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <app-icon name="plus" [size]="12"></app-icon> Add Degree
          </button>
        </div>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">Section Title</label>
        <input
          type="text"
          [ngModel]="eduSection.title"
          (ngModelChange)="updateSection({ title: $event })"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded-lg p-2"
        />
      </div>

      <div class="space-y-3 pt-2">
        <div
          *ngFor="let item of eduSection.items; let i = index; trackBy: trackById"
          class="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-200">#{{ i + 1 }} {{ item.degree || 'Degree' }}</span>
            <button (click)="deleteEdu(item.id)" class="text-rose-400 hover:text-rose-300 p-1 cursor-pointer">
              <app-icon name="trash-2" [size]="14"></app-icon>
            </button>
          </div>

          <input
            type="text"
            placeholder="Degree Name"
            [ngModel]="item.degree"
            (ngModelChange)="updateItem(item.id, { degree: $event })"
            class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-1.5"
          />

          <div class="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="College / University"
              [ngModel]="item.college"
              (ngModelChange)="updateItem(item.id, { college: $event })"
              class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-1.5"
            />
            <input
              type="text"
              placeholder="Duration (2019 - 2023)"
              [ngModel]="item.duration"
              (ngModelChange)="updateItem(item.id, { duration: $event })"
              class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-1.5"
            />
          </div>

          <input
            type="text"
            placeholder="Grade / GPA / Honors"
            [ngModel]="item.grade"
            (ngModelChange)="updateItem(item.id, { grade: $event })"
            class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-1.5"
          />
        </div>
      </div>
    </div>
  `,
})
export class EducationInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get eduSection(): EducationSection {
    return this.state.portfolio().education;
  }

  trackById(_: number, item: EducationItem): string {
    return item.id;
  }

  updateSection(partial: Partial<EducationSection>) {
    this.state.updateEducation(partial);
  }

  addEdu() {
    const newItem: EducationItem = {
      id: Date.now().toString(),
      degree: 'B.S. in Computer Science',
      college: 'University Name',
      duration: '2019 - 2023',
      grade: '3.8 GPA',
      description: 'Focused on algorithms, data structures & software architecture.',
    };
    this.updateSection({
      items: [...this.eduSection.items, newItem],
    });
  }

  deleteEdu(id: string) {
    this.updateSection({
      items: this.eduSection.items.filter((item) => item.id !== id),
    });
  }

  updateItem(id: string, partial: Partial<EducationItem>) {
    const updated = this.eduSection.items.map((item) => (item.id === id ? { ...item, ...partial } : item));
    this.updateSection({ items: updated });
  }
}
