import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { PersonalDetailItem } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss'],
})
export class AboutSectionComponent {
  readonly state = inject(PortfolioStateService);

  get customDetails(): PersonalDetailItem[] {
    return this.state.portfolio().about.customDetails || [];
  }

  trackById(_: number, item: PersonalDetailItem): string {
    return item.id;
  }

  isEmail(val: string): boolean {
    return !!val && val.includes('@') && val.includes('.');
  }

  isStatus(label: string): boolean {
    return !!label && (label.toLowerCase().includes('freelance') || label.toLowerCase().includes('status'));
  }

  isLongValue(val: string): boolean {
    return !!val && val.length > 25;
  }

  get hasAnyMetrics(): boolean {
    const ab = this.state.portfolio().about;
    return !!(ab.experienceYears || ab.projectsCount || ab.clientsCount);
  }

  get activeMetricsCount(): number {
    const ab = this.state.portfolio().about;
    let count = 0;
    if (ab.experienceYears) count++;
    if (ab.projectsCount) count++;
    if (ab.clientsCount) count++;
    return count;
  }

  selectAbout(event: Event) {
    if (!this.state.previewMode()) {
      event.stopPropagation();
      this.state.selectSection('about');
    }
  }
}
