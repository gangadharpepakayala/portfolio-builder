import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../core/services/portfolio-state.service';
import { ZipExportService } from '../../core/services/zip-export.service';
import { ThemePresetKey } from '../../core/models/portfolio.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-top-toolbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
})
export class TopToolbarComponent {
  readonly state = inject(PortfolioStateService);
  readonly zipExport = inject(ZipExportService);

  isExporting = false;

  onThemeChange(event: Event) {
    const key = (event.target as HTMLSelectElement).value as ThemePresetKey;
    this.state.applyThemePreset(key);
  }

  async exportZip() {
    this.isExporting = true;
    try {
      await this.zipExport.exportPortfolioZip(this.state.portfolio());
    } catch (err) {
      console.error('Error generating portfolio zip export:', err);
    } finally {
      this.isExporting = false;
    }
  }
}
