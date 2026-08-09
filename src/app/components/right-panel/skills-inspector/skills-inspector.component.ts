import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { SkillItem, SkillsSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-skills-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-5">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">Skills Section & Styles</h3>
        <button
          (click)="addSkill()"
          class="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
        >
          <app-icon name="plus" [size]="14"></app-icon> Add Skill Card
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
              [value]="skillsSection.titleColor || state.portfolio().colors.heading"
              (input)="updateSection({ titleColor: $any($event.target).value })"
              class="w-7 h-7 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
          </div>
        </div>
        <input
          type="text"
          [ngModel]="skillsSection.title"
          (ngModelChange)="updateSection({ title: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Background Fill -->
      <div class="flex justify-between items-center p-3 rounded-xl border border-slate-800 bg-slate-900/60">
        <label class="text-xs font-bold text-slate-200">Section Background Color</label>
        <input
          type="color"
          [value]="skillsSection.bgColor || state.portfolio().colors.background"
          (input)="updateSection({ bgColor: $any($event.target).value })"
          class="w-8 h-8 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
        />
      </div>

      <!-- Skills Cards List -->
      <div class="space-y-3 pt-2">
        <div
          *ngFor="let item of skillsSection.skills; let i = index"
          class="p-3.5 rounded-xl border border-slate-800 bg-slate-900/70 space-y-3 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-slate-200">#{{ i + 1 }} {{ item.name || 'Skill' }}</span>
            <button
              (click)="deleteSkill(item.id, item.name)"
              class="flex items-center gap-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 hover:bg-slate-800 px-2 py-1 rounded transition-colors cursor-pointer"
              title="Delete Skill Card"
            >
              <app-icon name="trash-2" [size]="14"></app-icon> Delete
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Skill Name"
              [ngModel]="item.name"
              (ngModelChange)="updateSkillItem(item.id, { name: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-100 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Category"
              [ngModel]="item.category"
              (ngModelChange)="updateSkillItem(item.id, { category: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-100 rounded-lg p-2"
            />
          </div>

          <div class="flex items-center gap-3">
            <div class="flex-1 space-y-1">
              <div class="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>Proficiency</span>
                <span>{{ item.percentage }}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                [ngModel]="item.percentage"
                (ngModelChange)="updateSkillItem(item.id, { percentage: $event })"
                class="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div class="flex items-center gap-1.5">
              <span class="text-[10px] text-slate-400">Bar Fill</span>
              <input
                type="color"
                [ngModel]="item.color"
                (ngModelChange)="updateSkillItem(item.id, { color: $event })"
                class="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer p-0.5"
                title="Progress Bar Color"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SkillsInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get skillsSection(): SkillsSection {
    return this.state.portfolio().skills;
  }

  updateSection(partial: Partial<SkillsSection>) {
    this.state.updateSkills(partial);
  }

  addSkill() {
    const newSkill: SkillItem = {
      id: Date.now().toString(),
      name: 'New Skill',
      percentage: 80,
      category: 'Frontend',
      icon: 'code',
      color: '#6366f1',
    };
    this.updateSection({
      skills: [...this.skillsSection.skills, newSkill],
    });
  }

  deleteSkill(id: string, skillName: string) {
    if (confirm(`Are you sure you want to delete the skill '${skillName || 'New Skill'}'?`)) {
      this.updateSection({
        skills: this.skillsSection.skills.filter((s) => s.id !== id),
      });
    }
  }

  updateSkillItem(id: string, partial: Partial<SkillItem>) {
    const updated = this.skillsSection.skills.map((s) => (s.id === id ? { ...s, ...partial } : s));
    this.updateSection({ skills: updated });
  }
}
