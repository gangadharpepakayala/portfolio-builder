import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../core/services/portfolio-state.service';
import { TabThemeComponent } from './tab-theme/tab-theme.component';
import { TabTypographyComponent } from './tab-typography/tab-typography.component';
import { TabImagesComponent } from './tab-images/tab-images.component';
import { TabSectionsComponent } from './tab-sections/tab-sections.component';
import { TabLayoutComponent } from './tab-layout/tab-layout.component';
import { TabExportComponent } from './tab-export/tab-export.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    TabThemeComponent,
    TabTypographyComponent,
    TabImagesComponent,
    TabSectionsComponent,
    TabLayoutComponent,
    TabExportComponent,
    IconComponent,
  ],
  template: `
    <aside class="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-[calc(100vh-4rem)] select-none">
      <!-- Sidebar Tabs Navigation -->
      <div class="flex items-center border-b border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none">
        <button
          *ngFor="let tab of tabs"
          (click)="state.setActiveTab(tab.id)"
          [class.bg-slate-900]="state.activeTab() === tab.id"
          [class.text-indigo-400]="state.activeTab() === tab.id"
          [class.border-b-2]="state.activeTab() === tab.id"
          [class.border-indigo-500]="state.activeTab() === tab.id"
          [class.text-slate-400]="state.activeTab() !== tab.id"
          class="flex-1 min-w-[70px] py-3 px-2 flex flex-col items-center gap-1 text-[11px] font-bold transition-all hover:text-slate-200 cursor-pointer"
        >
          <app-icon [name]="tab.icon" [size]="16"></app-icon>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- Tab Active Drawer Content -->
      <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <ng-container [ngSwitch]="state.activeTab()">
          <app-tab-theme *ngSwitchCase="'theme'"></app-tab-theme>
          <app-tab-typography *ngSwitchCase="'typography'"></app-tab-typography>
          <app-tab-images *ngSwitchCase="'images'"></app-tab-images>
          <app-tab-sections *ngSwitchCase="'sections'"></app-tab-sections>
          <app-tab-layout *ngSwitchCase="'layout'"></app-tab-layout>
          <app-tab-export *ngSwitchCase="'export'"></app-tab-export>
        </ng-container>
      </div>
    </aside>
  `,
})
export class LeftSidebarComponent {
  readonly state = inject(PortfolioStateService);

  tabs: Array<{
    id: 'theme' | 'typography' | 'images' | 'sections' | 'layout' | 'export';
    label: string;
    icon: string;
  }> = [
    { id: 'theme', label: 'Theme', icon: 'palette' },
    { id: 'typography', label: 'Fonts', icon: 'type' },
    { id: 'images', label: 'Images', icon: 'image' },
    { id: 'sections', label: 'Sections', icon: 'layers' },
    { id: 'layout', label: 'Layout', icon: 'layout-grid' },
    { id: 'export', label: 'Export', icon: 'download' },
  ];
}
