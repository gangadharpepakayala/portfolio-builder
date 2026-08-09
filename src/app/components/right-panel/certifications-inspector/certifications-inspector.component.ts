import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { CertificationItem, CertificationsSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-certifications-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './certifications-inspector.component.html',
  styleUrls: ['./certifications-inspector.component.scss'],
})
export class CertificationsInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get certSection(): CertificationsSection {
    return this.state.portfolio().certifications;
  }

  updateSection(partial: Partial<CertificationsSection>) {
    this.state.updateCertifications(partial);
  }

  addCertification() {
    const newItem: CertificationItem = {
      id: Date.now().toString(),
      title: 'New Professional Certification',
      issuer: 'Global Certification Body',
      issueDate: '2024',
      credentialId: 'CERT-' + Math.floor(10000 + Math.random() * 90000),
      credentialUrl: 'https://example.com/verify',
      description: 'Validated expertise in cloud infrastructure, security, and enterprise architecture.',
      icon: 'award',
    };
    this.updateSection({
      certifications: [...this.certSection.certifications, newItem],
    });
  }

  deleteCertification(id: string, title: string) {
    if (confirm(`Are you sure you want to delete the certificate card '${title || 'Untitled'}'?`)) {
      this.updateSection({
        certifications: this.certSection.certifications.filter((c) => c.id !== id),
      });
    }
  }

  updateItem(id: string, partial: Partial<CertificationItem>) {
    const updated = this.certSection.certifications.map((c) => (c.id === id ? { ...c, ...partial } : c));
    this.updateSection({ certifications: updated });
  }
}
