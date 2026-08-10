import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { AchievementItem, AchievementsSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-achievements-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-5">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">Honors & Achievements Editor</h3>
        <button
          (click)="addAchievement()"
          class="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
        >
          <app-icon name="plus" [size]="14"></app-icon> Add Honor Card
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
              [value]="achSection.titleColor || state.portfolio().colors.heading"
              (input)="updateSection({ titleColor: $any($event.target).value })"
              class="w-7 h-7 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
          </div>
        </div>
        <input
          type="text"
          [ngModel]="achSection.title"
          (ngModelChange)="updateSection({ title: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Subtitle -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-200">Subtitle</label>
        <input
          type="text"
          [ngModel]="achSection.subtitle"
          (ngModelChange)="updateSection({ subtitle: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Section Background Fill -->
      <div class="flex justify-between items-center p-3 rounded-xl border border-slate-800 bg-slate-900/60">
        <label class="text-xs font-bold text-slate-200">Section Background Color</label>
        <input
          type="color"
          [value]="achSection.bgColor || state.portfolio().colors.background"
          (input)="updateSection({ bgColor: $any($event.target).value })"
          class="w-8 h-8 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
        />
      </div>

      <!-- Achievements Cards List (trackBy: trackById prevents DOM input focus loss) -->
      <div class="space-y-4 pt-2">
        <div
          *ngFor="let item of achSection.achievements; let i = index; trackBy: trackById"
          class="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-3 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-slate-200">Honor #{{ i + 1 }}: {{ item.title || 'Untitled' }}</span>
            <button
              (click)="deleteAchievement(item.id, item.title)"
              class="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Delete Achievement Card"
            >
              <app-icon name="trash-2" [size]="16"></app-icon>
            </button>
          </div>

          <div class="space-y-2.5">
            <input
              type="text"
              placeholder="Award / Certificate Title"
              [ngModel]="item.title"
              (ngModelChange)="updateItem(item.id, { title: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs font-bold text-slate-100 rounded-lg p-2.5"
            />

            <div class="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Issuer / Organization"
                [ngModel]="item.issuer"
                (ngModelChange)="updateItem(item.id, { issuer: $event })"
                class="bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-100 rounded-lg p-2.5"
              />
              <input
                type="text"
                placeholder="Year (e.g. 2024)"
                [ngModel]="item.year"
                (ngModelChange)="updateItem(item.id, { year: $event })"
                class="bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 rounded-lg p-2.5"
              />
            </div>

            <textarea
              rows="3"
              placeholder="Honor details & description..."
              [ngModel]="item.description"
              (ngModelChange)="updateItem(item.id, { description: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs text-slate-100 rounded-lg p-2.5 leading-relaxed"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AchievementsInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get achSection(): AchievementsSection {
    return this.state.portfolio().achievements;
  }

  trackById(_: number, item: AchievementItem): string {
    return item.id;
  }

  updateSection(partial: Partial<AchievementsSection>) {
    this.state.updateAchievements(partial);
  }

  addAchievement() {
    const newItem: AchievementItem = {
      id: Date.now().toString(),
      title: 'New Honor & Award',
      issuer: 'Global Tech Organization',
      year: '2024',
      description: 'Recognized for outstanding innovation and excellence in frontend engineering.',
      icon: 'award',
    };
    this.updateSection({
      achievements: [...this.achSection.achievements, newItem],
    });
  }

  deleteAchievement(id: string, title: string) {
    if (confirm(`Are you sure you want to delete the honor entry '${title || 'Untitled'}'?`)) {
      this.updateSection({
        achievements: this.achSection.achievements.filter((a) => a.id !== id),
      });
    }
  }

  updateItem(id: string, partial: Partial<AchievementItem>) {
    const updated = this.achSection.achievements.map((a) => (a.id === id ? { ...a, ...partial } : a));
    this.updateSection({ achievements: updated });
  }
}
