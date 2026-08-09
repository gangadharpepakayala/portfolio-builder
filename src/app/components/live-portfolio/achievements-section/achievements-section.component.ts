import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-achievements-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section
      *ngIf="state.portfolio().achievements.visible"
      (click)="selectAch($event)"
      [class.canvas-section-selected]="state.selectedSectionId() === 'achievements'"
      data-section-title="Achievements Section"
      class="w-full py-20 px-6 cursor-pointer transition-all border-t border-white/5"
      [style.backgroundColor]="state.portfolio().colors.background"
    >
      <div class="max-w-6xl mx-auto space-y-12">
        <div class="text-center space-y-2">
          <h2 class="text-3xl sm:text-4xl font-extrabold" [style.color]="state.portfolio().colors.heading">
            {{ state.portfolio().achievements.title }}
          </h2>
          <p class="text-sm sm:text-base max-w-xl mx-auto" [style.color]="state.portfolio().colors.text">
            {{ state.portfolio().achievements.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            *ngFor="let item of state.portfolio().achievements.achievements"
            class="p-6 rounded-2xl border flex items-start gap-4"
            [style.backgroundColor]="state.portfolio().colors.cardBg"
            [style.borderColor]="state.portfolio().colors.borderColor"
          >
            <div class="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <app-icon name="trophy" [size]="24"></app-icon>
            </div>
            <div class="space-y-1">
              <h3 class="text-lg font-bold" [style.color]="state.portfolio().colors.heading">
                {{ item.title }}
              </h3>
              <h4 class="text-xs font-semibold text-amber-400">
                {{ item.issuer }} ({{ item.year }})
              </h4>
              <p class="text-xs pt-2 leading-relaxed" [style.color]="state.portfolio().colors.text">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AchievementsSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectAch(event: Event) {
    event.stopPropagation();
    this.state.selectSection('achievements');
  }
}
