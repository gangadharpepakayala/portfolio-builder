import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer
      *ngIf="state.portfolio().footer.visible"
      (click)="selectFooter($event)"
      [class.canvas-section-selected]="state.selectedSectionId() === 'footer'"
      data-section-title="Footer"
      class="w-full py-10 px-6 cursor-pointer text-center text-xs border-t border-white/5 transition-all"
      [style.backgroundColor]="state.portfolio().footer.bgColor || state.portfolio().colors.footerBg"
      [style.color]="state.portfolio().footer.textColor || state.portfolio().colors.text"
    >
      <div class="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <p class="font-medium opacity-90">
          {{ state.portfolio().footer.copyrightText }}
        </p>
      </div>
    </footer>
  `,
})
export class FooterSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectFooter(event: Event) {
    event.stopPropagation();
    this.state.selectSection('footer');
  }
}
