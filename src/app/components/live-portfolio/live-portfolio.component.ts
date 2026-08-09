import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../core/services/portfolio-state.service';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { SkillsSectionComponent } from './skills-section/skills-section.component';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';
import { EducationSectionComponent } from './education-section/education-section.component';
import { CertificationsSectionComponent } from './certifications-section/certifications-section.component';
import { AchievementsSectionComponent } from './achievements-section/achievements-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { NavbarSectionComponent } from './navbar-section/navbar-section.component';

@Component({
  selector: 'app-live-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    EducationSectionComponent,
    CertificationsSectionComponent,
    AchievementsSectionComponent,
    TestimonialsSectionComponent,
    ContactSectionComponent,
    FooterSectionComponent,
    NavbarSectionComponent,
  ],
  templateUrl: './live-portfolio.component.html',
  styleUrls: ['./live-portfolio.component.scss'],
})
export class LivePortfolioComponent {
  readonly state = inject(PortfolioStateService);
}
