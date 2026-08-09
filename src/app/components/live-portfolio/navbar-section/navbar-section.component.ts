import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';

@Component({
  selector: 'app-navbar-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      *ngIf="state.portfolio().navbar.visible"
      (click)="onNavbarClick($event)"
      [class.canvas-section-selected]="!state.previewMode() && state.selectedSectionId() === 'navbar'"
      data-section-title="Navbar"
      class="w-full py-5 px-8 transition-all border-b border-white/5 cursor-pointer z-30 select-none"
      [style.backgroundColor]="state.portfolio().navbar.bgColor || state.portfolio().colors.navbarBg"
      [style.backdropFilter]="state.portfolio().navbar.isTransparent ? 'blur(12px)' : 'none'"
    >
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <a
          class="text-2xl sm:text-3xl font-extrabold tracking-tight"
          [style.color]="state.portfolio().navbar.logoColor || state.portfolio().colors.heading"
        >
          {{ state.portfolio().navbar.logoText }}
        </a>

        <nav class="hidden md:flex items-center gap-8">
          <a
            *ngFor="let link of state.portfolio().navbar.links"
            [hidden]="!link.visible"
            [href]="'#' + link.sectionId"
            (click)="onLinkClick($event, link.sectionId)"
            class="text-sm sm:text-base font-bold hover:opacity-80 transition-opacity tracking-wide"
            [style.color]="state.portfolio().colors.text"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
    </header>
  `,
})
export class NavbarSectionComponent {
  readonly state = inject(PortfolioStateService);

  onNavbarClick(event: Event) {
    if (!this.state.previewMode()) {
      event.stopPropagation();
      this.state.selectSection('navbar');
    }
  }

  onLinkClick(event: Event, targetSectionId: string) {
    if (!this.state.previewMode()) {
      // In Editing Mode: Only select the target section in side editor WITHOUT scrolling/navigating
      event.preventDefault();
      event.stopPropagation();
      this.state.selectSection(targetSectionId);
    } else {
      // In Live Preview Mode: Perform smooth scroll navigation
      event.preventDefault();
      this.state.scrollToSection(targetSectionId);
    }
  }
}
