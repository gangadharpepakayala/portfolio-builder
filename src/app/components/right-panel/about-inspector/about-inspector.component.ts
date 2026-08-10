import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { AboutSection, PersonalDetailItem } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ImagePickerComponent } from '../../../shared/components/image-picker/image-picker.component';

@Component({
  selector: 'app-about-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ImagePickerComponent],
  templateUrl: './about-inspector.component.html',
  styleUrls: ['./about-inspector.component.scss'],
})
export class AboutInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get about(): AboutSection {
    return this.state.portfolio().about;
  }

  get hasAnyMetrics(): boolean {
    return !!(this.about.experienceYears || this.about.projectsCount || this.about.clientsCount);
  }

  trackById(_: number, item: PersonalDetailItem): string {
    return item.id;
  }

  trackByIndex(index: number): number {
    return index;
  }

  update(partial: Partial<AboutSection>) {
    this.state.updateAbout(partial);
  }

  updatePersonalDetail(id: string, partial: Partial<PersonalDetailItem>) {
    const list = [...(this.about.customDetails || [])];
    const updated = list.map((item) => (item.id === id ? { ...item, ...partial } : item));
    this.update({ customDetails: updated });
  }

  addPersonalDetail() {
    const list = [...(this.about.customDetails || [])];
    const newItem: PersonalDetailItem = {
      id: Date.now().toString(),
      label: 'New Detail',
      value: 'Sample Value',
    };
    this.update({ customDetails: [...list, newItem] });
  }

  deletePersonalDetail(id: string, label: string) {
    if (confirm(`Are you sure you want to delete the detail field '${label || 'Untitled'}'?`)) {
      const list = [...(this.about.customDetails || [])];
      const updated = list.filter((item) => item.id !== id);
      this.update({ customDetails: updated });
    }
  }

  updateHighlight(index: number, text: string) {
    const updated = [...this.about.highlights];
    updated[index] = text;
    this.update({ highlights: updated });
  }

  addHighlight() {
    this.update({ highlights: [...this.about.highlights, 'New Key Highlight'] });
  }

  deleteHighlight(index: number) {
    if (confirm('Are you sure you want to delete this highlight bullet point?')) {
      const updated = this.about.highlights.filter((_, i) => i !== index);
      this.update({ highlights: updated });
    }
  }

  deleteMetric(metricKey: 'experienceYears' | 'projectsCount' | 'clientsCount') {
    const labelName = metricKey === 'experienceYears' ? 'Experience' : metricKey === 'projectsCount' ? 'Projects' : 'Clients';
    if (confirm(`Are you sure you want to delete the ${labelName} metric badge?`)) {
      this.update({ [metricKey]: '' });
    }
  }

  deleteEntireMetricsSection() {
    if (confirm('Are you sure you want to delete the entire Key Metrics counter section?')) {
      this.update({
        experienceYears: '',
        projectsCount: '',
        clientsCount: '',
      });
    }
  }

  restoreKeyMetrics() {
    this.update({
      experienceYears: '8+',
      projectsCount: '45+',
      clientsCount: '20+',
    });
  }
}
