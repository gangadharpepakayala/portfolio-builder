import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../core/services/portfolio-state.service';
import { HeroInspectorComponent } from '../right-panel/hero-inspector/hero-inspector.component';
import { AboutInspectorComponent } from '../right-panel/about-inspector/about-inspector.component';
import { SkillsInspectorComponent } from '../right-panel/skills-inspector/skills-inspector.component';
import { ExperienceInspectorComponent } from '../right-panel/experience-inspector/experience-inspector.component';
import { ProjectsInspectorComponent } from '../right-panel/projects-inspector/projects-inspector.component';
import { EducationInspectorComponent } from '../right-panel/education-inspector/education-inspector.component';
import { CertificationsInspectorComponent } from '../right-panel/certifications-inspector/certifications-inspector.component';
import { AchievementsInspectorComponent } from '../right-panel/achievements-inspector/achievements-inspector.component';
import { TestimonialsInspectorComponent } from '../right-panel/testimonials-inspector/testimonials-inspector.component';
import { ContactInspectorComponent } from '../right-panel/contact-inspector/contact-inspector.component';
import { FooterInspectorComponent } from '../right-panel/footer-inspector/footer-inspector.component';
import { NavbarInspectorComponent } from '../right-panel/navbar-inspector/navbar-inspector.component';

import { TabThemeComponent } from '../left-sidebar/tab-theme/tab-theme.component';
import { TabTypographyComponent } from '../left-sidebar/tab-typography/tab-typography.component';
import { TabImagesComponent } from '../left-sidebar/tab-images/tab-images.component';
import { TabSectionsComponent } from '../left-sidebar/tab-sections/tab-sections.component';
import { TabLayoutComponent } from '../left-sidebar/tab-layout/tab-layout.component';
import { TabExportComponent } from '../left-sidebar/tab-export/tab-export.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

import { SectionType } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    CommonModule,
    HeroInspectorComponent,
    AboutInspectorComponent,
    SkillsInspectorComponent,
    ExperienceInspectorComponent,
    ProjectsInspectorComponent,
    EducationInspectorComponent,
    CertificationsInspectorComponent,
    AchievementsInspectorComponent,
    TestimonialsInspectorComponent,
    ContactInspectorComponent,
    FooterInspectorComponent,
    NavbarInspectorComponent,
    TabThemeComponent,
    TabTypographyComponent,
    TabImagesComponent,
    TabSectionsComponent,
    TabLayoutComponent,
    TabExportComponent,
    IconComponent,
  ],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  readonly state = inject(PortfolioStateService);

  viewMode: 'section' | 'global' = 'section';

  globalTabs: Array<{
    id: 'theme' | 'typography' | 'images' | 'sections' | 'layout' | 'export';
    label: string;
    icon: string;
  }> = [
    { id: 'theme', label: 'Presets', icon: 'palette' },
    { id: 'typography', label: 'Fonts', icon: 'type' },
    { id: 'images', label: 'Images', icon: 'image' },
    { id: 'sections', label: 'Reorder', icon: 'layers' },
    { id: 'layout', label: 'Layout', icon: 'layout-grid' },
    { id: 'export', label: 'Export', icon: 'download' },
  ];

  sectionNavs = [
    { id: 'navbar', label: 'Navbar' },
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'testimonials', label: 'Endorsements' },
    { id: 'contact', label: 'Contact' },
    { id: 'footer', label: 'Footer' },
  ];

  get isSelectedSectionVisible(): boolean {
    const secId = this.state.selectedSectionId();
    if (!secId) return true;
    const portfolio = this.state.portfolio() as any;
    return portfolio[secId]?.visible !== false;
  }

  toggleSelectedSectionVisibility() {
    const secId = this.state.selectedSectionId();
    if (secId) {
      this.state.toggleSectionVisibility(secId as SectionType);
    }
  }

  isSectionHidden(sectionId: string): boolean {
    const portfolio = this.state.portfolio() as any;
    return portfolio[sectionId]?.visible === false;
  }
}
