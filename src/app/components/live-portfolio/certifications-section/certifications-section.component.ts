import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-certifications-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './certifications-section.component.html',
  styleUrls: ['./certifications-section.component.scss'],
})
export class CertificationsSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectCertifications(event: Event) {
    if (!this.state.previewMode()) {
      event.stopPropagation();
      this.state.selectSection('certifications');
    }
  }

  onLinkClick(event: Event) {
    if (!this.state.previewMode()) {
      event.preventDefault();
      event.stopPropagation();
      this.state.selectSection('certifications');
    }
  }
}
