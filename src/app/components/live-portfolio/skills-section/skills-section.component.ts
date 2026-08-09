import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      *ngIf="state.portfolio().skills.visible"
      id="skills"
      (click)="selectSkills($event)"
      [class.canvas-section-selected]="state.selectedSectionId() === 'skills'"
      data-section-title="Skills Section"
      class="w-full py-20 px-6 cursor-pointer transition-all border-t border-white/5"
      [style.backgroundColor]="state.portfolio().skills.bgColor || state.portfolio().colors.background"
    >
      <div class="max-w-6xl mx-auto space-y-12">
        <div class="text-center space-y-2">
          <h2
            class="text-3xl sm:text-4xl font-extrabold"
            [style.color]="state.portfolio().skills.titleColor || state.portfolio().colors.heading"
          >
            {{ state.portfolio().skills.title }}
          </h2>
          <p class="text-sm sm:text-base max-w-xl mx-auto" [style.color]="state.portfolio().colors.text">
            {{ state.portfolio().skills.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            *ngFor="let item of state.portfolio().skills.skills"
            class="p-5 rounded-2xl border transition-transform hover:-translate-y-1"
            [style.backgroundColor]="state.portfolio().colors.cardBg"
            [style.borderColor]="state.portfolio().colors.borderColor"
          >
            <div class="flex items-center justify-between font-bold text-sm mb-3">
              <span [style.color]="state.portfolio().colors.heading">{{ item.name }}</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-white/5" [style.color]="state.portfolio().colors.primary">
                {{ item.percentage }}%
              </span>
            </div>

            <div class="w-full h-2 rounded-full overflow-hidden bg-white/10">
              <div
                class="h-full rounded-full transition-all duration-500"
                [style.width.%]="item.percentage"
                [style.backgroundColor]="item.color || state.portfolio().colors.primary"
              ></div>
            </div>
            <div class="text-[10px] text-slate-400 mt-2 capitalize">{{ item.category }}</div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class SkillsSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectSkills(event: Event) {
    event.stopPropagation();
    this.state.selectSection('skills');
  }
}
