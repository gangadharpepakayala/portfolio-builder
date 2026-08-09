import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { HeroSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ImagePickerComponent } from '../../../shared/components/image-picker/image-picker.component';

@Component({
  selector: 'app-hero-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ImagePickerComponent],
  templateUrl: './hero-inspector.component.html',
  styleUrls: ['./hero-inspector.component.scss'],
})
export class HeroInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get hero(): HeroSection {
    return this.state.portfolio().hero;
  }

  update(partial: Partial<HeroSection>) {
    this.state.updateHero(partial);
  }

  onResumeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.update({
          resumeUrl: result,
          resumeFileName: file.name,
          ctaPrimaryUrl: result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  clearResumeFile() {
    this.update({
      resumeUrl: '',
      resumeFileName: '',
      ctaPrimaryUrl: '#contact',
    });
  }
}
