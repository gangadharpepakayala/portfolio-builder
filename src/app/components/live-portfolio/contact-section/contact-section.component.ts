import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss'],
})
export class ContactSectionComponent {
  readonly state = inject(PortfolioStateService);

  get isLightTheme(): boolean {
    const p = this.state.portfolio();
    const preset = (p.themePreset || '').toLowerCase();
    if (preset === 'light' || preset === 'minimal' || preset === 'corporate') {
      return true;
    }

    const bg = (p.colors.background || '').toLowerCase();
    const cardBg = (p.colors.cardBg || '').toLowerCase();

    const isHexLight = (hex: string): boolean => {
      if (!hex || !hex.startsWith('#')) return false;
      const clean = hex.replace('#', '');
      if (clean.length === 3) {
        const r = parseInt(clean[0] + clean[0], 16);
        const g = parseInt(clean[1] + clean[1], 16);
        const b = parseInt(clean[2] + clean[2], 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 140;
      }
      if (clean.length === 6) {
        const r = parseInt(clean.substring(0, 2), 16);
        const g = parseInt(clean.substring(2, 4), 16);
        const b = parseInt(clean.substring(4, 6), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 140;
      }
      return false;
    };

    return isHexLight(cardBg) || isHexLight(bg) || cardBg === 'white' || bg === 'white';
  }

  selectContact(event: Event) {
    if (!this.state.previewMode()) {
      event.stopPropagation();
      this.state.selectSection('contact');
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.state.previewMode()) {
      this.state.selectSection('contact');
    } else {
      alert('Thank you for reaching out! Your message has been sent successfully.');
    }
  }
}
