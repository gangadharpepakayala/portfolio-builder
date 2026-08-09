import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../core/services/portfolio-state.service';
import { HeroInspectorComponent } from './hero-inspector/hero-inspector.component';
import { AboutInspectorComponent } from './about-inspector/about-inspector.component';
import { SkillsInspectorComponent } from './skills-inspector/skills-inspector.component';
import { ExperienceInspectorComponent } from './experience-inspector/experience-inspector.component';
import { ProjectsInspectorComponent } from './projects-inspector/projects-inspector.component';
import { EducationInspectorComponent } from './education-inspector/education-inspector.component';
import { ContactInspectorComponent } from './contact-inspector/contact-inspector.component';
import { FooterInspectorComponent } from './footer-inspector/footer-inspector.component';
import { NavbarInspectorComponent } from './navbar-inspector/navbar-inspector.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [
    CommonModule,
    HeroInspectorComponent,
    AboutInspectorComponent,
    SkillsInspectorComponent,
    ExperienceInspectorComponent,
    ProjectsInspectorComponent,
    EducationInspectorComponent,
    ContactInspectorComponent,
    FooterInspectorComponent,
    NavbarInspectorComponent,
    IconComponent,
  ],
  template: `
    <aside class="w-80 bg-slate-900/95 border-l border-slate-800 flex flex-col h-[calc(100vh-4rem)] select-none z-40">
      <!-- Panel Header -->
      <div class="h-12 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-950/60">
        <div class="flex items-center gap-2 text-xs font-bold text-slate-100 uppercase tracking-wider">
          <app-icon name="sliders-horizontal" [size]="16" class="text-indigo-400"></app-icon>
          <span>Properties Inspector</span>
        </div>
        <span class="text-[10px] text-slate-400 font-semibold px-2 py-0.5 bg-slate-800 rounded-md border border-slate-700">
          {{ state.selectedSectionId() || 'Canvas' }}
        </span>
      </div>

      <!-- Inspector Content Area -->
      <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <ng-container [ngSwitch]="state.selectedSectionId()">
          <app-hero-inspector *ngSwitchCase="'hero'"></app-hero-inspector>
          <app-about-inspector *ngSwitchCase="'about'"></app-about-inspector>
          <app-skills-inspector *ngSwitchCase="'skills'"></app-skills-inspector>
          <app-experience-inspector *ngSwitchCase="'experience'"></app-experience-inspector>
          <app-projects-inspector *ngSwitchCase="'projects'"></app-projects-inspector>
          <app-education-inspector *ngSwitchCase="'education'"></app-education-inspector>
          <app-contact-inspector *ngSwitchCase="'contact'"></app-contact-inspector>
          <app-footer-inspector *ngSwitchCase="'footer'"></app-footer-inspector>
          <app-navbar-inspector *ngSwitchCase="'navbar'"></app-navbar-inspector>

          <!-- Fallback when no specific section selected -->
          <div *ngSwitchDefault class="text-center py-12 px-4 space-y-3">
            <div class="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-indigo-400">
              <app-icon name="mouse-pointer-click" [size]="24"></app-icon>
            </div>
            <h4 class="text-xs font-bold text-slate-200">No Section Selected</h4>
            <p class="text-[11px] text-slate-400 leading-relaxed">
              Click any element or section inside the live portfolio preview canvas to inspect and modify its properties.
            </p>
          </div>
        </ng-container>
      </div>
    </aside>
  `,
})
export class RightPanelComponent {
  readonly state = inject(PortfolioStateService);
}
