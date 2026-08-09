import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { LivePortfolioComponent } from './components/live-portfolio/live-portfolio.component';
import { PortfolioStateService } from './core/services/portfolio-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TopToolbarComponent,
    SidePanelComponent,
    LivePortfolioComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly state = inject(PortfolioStateService);
}
