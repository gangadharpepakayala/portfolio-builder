import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      *ngIf="state.portfolio().testimonials.visible"
      (click)="selectTestimonials($event)"
      [class.canvas-section-selected]="state.selectedSectionId() === 'testimonials'"
      data-section-title="Testimonials Section"
      class="w-full py-20 px-6 cursor-pointer transition-all border-t border-white/5"
      [style.backgroundColor]="state.portfolio().colors.sectionBg"
    >
      <div class="max-w-6xl mx-auto space-y-12">
        <div class="text-center space-y-2">
          <h2 class="text-3xl sm:text-4xl font-extrabold" [style.color]="state.portfolio().colors.heading">
            {{ state.portfolio().testimonials.title }}
          </h2>
          <p class="text-sm sm:text-base max-w-xl mx-auto" [style.color]="state.portfolio().colors.text">
            {{ state.portfolio().testimonials.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            *ngFor="let item of state.portfolio().testimonials.testimonials"
            class="p-8 rounded-2xl border flex flex-col justify-between space-y-6"
            [style.backgroundColor]="state.portfolio().colors.cardBg"
            [style.borderColor]="state.portfolio().colors.borderColor"
          >
            <p class="text-sm italic leading-relaxed" [style.color]="state.portfolio().colors.text">
              "{{ item.content }}"
            </p>

            <div class="flex items-center gap-4 pt-2">
              <img [src]="item.avatar" [alt]="item.name" class="w-12 h-12 rounded-full object-cover border border-white/10" />
              <div>
                <h4 class="text-sm font-bold" [style.color]="state.portfolio().colors.heading">
                  {{ item.name }}
                </h4>
                <p class="text-xs" [style.color]="state.portfolio().colors.primary">
                  {{ item.role }}, {{ item.company }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectTestimonials(event: Event) {
    event.stopPropagation();
    this.state.selectSection('testimonials');
  }
}
