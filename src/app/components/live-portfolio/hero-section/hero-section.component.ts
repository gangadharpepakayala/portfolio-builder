import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectHero(event: Event) {
    if (!this.state.previewMode()) {
      event.stopPropagation();
      this.state.selectSection('hero');
    }
  }

  downloadResume(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.state.previewMode()) {
      this.state.selectSection('hero');
      return;
    }

    const hero = this.state.portfolio().hero;
    const resumeUrl = hero.resumeUrl || hero.ctaPrimaryUrl;
    const fileName = hero.resumeFileName || 'Resume.pdf';

    if (resumeUrl && resumeUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (resumeUrl && (resumeUrl.startsWith('http') || resumeUrl.includes('.'))) {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.target = '_blank';
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Please upload your resume file in the Hero editor panel.');
      this.state.selectSection('hero');
    }
  }

  onCtaClick(event: Event, targetUrl?: string) {
    if (!this.state.previewMode()) {
      event.preventDefault();
      event.stopPropagation();
      this.state.selectSection('hero');
    } else if (targetUrl && targetUrl.startsWith('#')) {
      event.preventDefault();
      this.state.scrollToSection(targetUrl);
    }
  }

  onSocialClick(event: Event) {
    if (!this.state.previewMode()) {
      event.preventDefault();
      event.stopPropagation();
      this.state.selectSection('hero');
    }
  }
}
