import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      *ngIf="state.portfolio().projects.visible"
      id="projects"
      (click)="selectProjects($event)"
      [class.canvas-section-selected]="!state.previewMode() && state.selectedSectionId() === 'projects'"
      data-section-title="Projects Section"
      class="w-full py-20 px-6 cursor-pointer transition-all border-t border-white/5 select-none"
      [style.backgroundColor]="state.portfolio().colors.background"
    >
      <div class="max-w-6xl mx-auto space-y-12">
        <div class="text-center space-y-2">
          <h2 class="text-3xl sm:text-4xl font-extrabold" [style.color]="state.portfolio().colors.heading">
            {{ state.portfolio().projects.title }}
          </h2>
          <p class="text-sm sm:text-base max-w-xl mx-auto" [style.color]="state.portfolio().colors.text">
            {{ state.portfolio().projects.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            *ngFor="let p of state.portfolio().projects.projects"
            class="group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col"
            [style.backgroundColor]="state.portfolio().colors.cardBg"
            [style.borderColor]="state.portfolio().colors.borderColor"
          >
            <div class="h-48 overflow-hidden relative">
              <img [src]="p.image" [alt]="p.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div class="space-y-2">
                <h3 class="text-xl font-bold" [style.color]="state.portfolio().colors.heading">{{ p.title }}</h3>
                <p class="text-xs sm:text-sm line-clamp-3 leading-relaxed" [style.color]="state.portfolio().colors.text">
                  {{ p.description }}
                </p>
              </div>

              <div class="space-y-4 pt-2">
                <div class="flex flex-wrap gap-1.5">
                  <span *ngFor="let tag of p.tags" class="text-[10px] px-2 py-0.5 rounded font-semibold bg-white/5" [style.color]="state.portfolio().colors.primary">
                    {{ tag }}
                  </span>
                </div>

                <div class="flex items-center gap-3 pt-2 border-t border-white/5">
                  <a
                    [href]="p.liveDemoUrl"
                    [target]="state.previewMode() ? '_blank' : '_self'"
                    (click)="onLinkClick($event)"
                    class="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                    [style.backgroundColor]="state.portfolio().colors.button"
                  >
                    Live Demo
                  </a>
                  <a
                    [href]="p.githubUrl"
                    [target]="state.previewMode() ? '_blank' : '_self'"
                    (click)="onLinkClick($event)"
                    class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border"
                    [style.borderColor]="state.portfolio().colors.borderColor"
                    [style.color]="state.portfolio().colors.heading"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ProjectsSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectProjects(event: Event) {
    if (!this.state.previewMode()) {
      event.stopPropagation();
      this.state.selectSection('projects');
    }
  }

  onLinkClick(event: Event) {
    if (!this.state.previewMode()) {
      event.preventDefault();
      event.stopPropagation();
      this.state.selectSection('projects');
    }
  }
}
