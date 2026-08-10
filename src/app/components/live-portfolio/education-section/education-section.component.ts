import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section
      *ngIf="state.portfolio().education.visible"
      (click)="selectEdu($event)"
      [class.canvas-section-selected]="state.selectedSectionId() === 'education'"
      data-section-title="Education Section"
      class="w-full py-20 px-6 cursor-pointer transition-all border-t border-white/5"
      [style.backgroundColor]="state.portfolio().colors.sectionBg"
    >
      <div class="max-w-4xl mx-auto space-y-12">
        <div class="text-center space-y-2">
          <h2 class="text-3xl sm:text-4xl font-extrabold" [style.color]="state.portfolio().colors.heading">
            {{ state.portfolio().education.title }}
          </h2>
          <p class="text-sm sm:text-base max-w-xl mx-auto" [style.color]="state.portfolio().colors.text">
            {{ state.portfolio().education.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            *ngFor="let item of state.portfolio().education.items"
            class="p-6 rounded-2xl border flex items-start gap-4"
            [style.backgroundColor]="state.portfolio().colors.cardBg"
            [style.borderColor]="state.portfolio().colors.borderColor"
          >
            <div class="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <app-icon name="graduation-cap" [size]="24"></app-icon>
            </div>
            <div class="space-y-1">
              <h3 class="text-lg font-bold" [style.color]="state.portfolio().colors.heading">
                {{ item.degree }}
              </h3>
              <h4 class="text-sm font-semibold" [style.color]="state.portfolio().colors.primary">
                {{ item.college }}
              </h4>
              <div class="text-xs text-slate-400 font-medium pt-1">
                {{ item.duration }} &bull; {{ item.grade }}
              </div>
              <p *ngIf="item.description" class="text-xs pt-2 leading-relaxed" [style.color]="state.portfolio().colors.text">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class EducationSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectEdu(event: Event) {
    event.stopPropagation();
    this.state.selectSection('education');
  }
}
