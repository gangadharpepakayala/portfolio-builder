import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      *ngIf="state.portfolio().experience.visible"
      id="experience"
      (click)="selectExperience($event)"
      [class.canvas-section-selected]="state.selectedSectionId() === 'experience'"
      data-section-title="Experience Section"
      class="w-full py-20 px-6 cursor-pointer transition-all border-t border-white/5"
      [style.backgroundColor]="state.portfolio().colors.sectionBg"
    >
      <div class="max-w-6xl mx-auto space-y-12">
        <div class="text-center space-y-2">
          <h2 class="text-3xl sm:text-4xl font-extrabold" [style.color]="state.portfolio().colors.heading">
            {{ state.portfolio().experience.title }}
          </h2>
          <p class="text-sm sm:text-base max-w-xl mx-auto" [style.color]="state.portfolio().colors.text">
            {{ state.portfolio().experience.subtitle }}
          </p>
        </div>

        <div class="space-y-8 max-w-4xl mx-auto">
          <div
            *ngFor="let item of state.portfolio().experience.experiences"
            class="p-6 rounded-2xl border transition-all hover:border-indigo-500/50"
            [style.backgroundColor]="state.portfolio().colors.cardBg"
            [style.borderColor]="state.portfolio().colors.borderColor"
          >
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <h3 class="text-xl font-bold" [style.color]="state.portfolio().colors.heading">{{ item.role }}</h3>
                <div class="text-sm font-semibold" [style.color]="state.portfolio().colors.primary">{{ item.company }}</div>
              </div>

              <div class="text-xs px-3 py-1 rounded-full border bg-white/5 font-mono" [style.borderColor]="state.portfolio().colors.borderColor" [style.color]="state.portfolio().colors.text">
                {{ item.duration }}
              </div>
            </div>

            <p class="text-sm leading-relaxed mb-4" [style.color]="state.portfolio().colors.text">
              {{ item.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                *ngFor="let tech of item.technologies"
                class="text-xs px-2.5 py-1 rounded-md font-semibold bg-indigo-500/10 text-indigo-400"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectExperience(event: Event) {
    event.stopPropagation();
    this.state.selectSection('experience');
  }
}
