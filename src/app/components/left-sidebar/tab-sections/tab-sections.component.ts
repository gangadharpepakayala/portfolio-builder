import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { SectionType } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-tab-sections',
  standalone: true,
  imports: [CommonModule, DragDropModule, IconComponent],
  template: `
    <div class="space-y-4">
      <div>
        <h2 class="text-sm font-bold text-slate-100 uppercase tracking-wider">Sections Manager</h2>
        <p class="text-xs text-slate-400 mt-1">Drag to reorder sections, toggle visibility, or click to edit properties.</p>
      </div>

      <div cdkDropList (cdkDropListDropped)="drop($event)" class="space-y-2">
        <div
          *ngFor="let secId of state.portfolio().sectionOrder"
          cdkDrag
          (click)="state.selectSection(secId)"
          [class.ring-2]="state.selectedSectionId() === secId"
          [class.ring-indigo-500]="state.selectedSectionId() === secId"
          class="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800/90 cursor-pointer transition-all group"
        >
          <div class="flex items-center gap-3">
            <span cdkDragHandle class="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300">
              <app-icon name="grip-vertical" [size]="16"></app-icon>
            </span>
            <span class="text-xs font-semibold text-slate-200 capitalize">
              {{ getSectionTitle(secId) }}
            </span>
          </div>

          <div class="flex items-center gap-1">
            <!-- Move Up -->
            <button
              (click)="moveUp(secId, $event)"
              title="Move Up"
              class="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <app-icon name="arrow-up" [size]="14"></app-icon>
            </button>

            <!-- Move Down -->
            <button
              (click)="moveDown(secId, $event)"
              title="Move Down"
              class="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <app-icon name="arrow-down" [size]="14"></app-icon>
            </button>

            <!-- Visibility Toggle -->
            <button
              (click)="toggleVisibility(secId, $event)"
              [class.text-emerald-400]="isSectionVisible(secId)"
              [class.text-slate-600]="!isSectionVisible(secId)"
              class="p-1 rounded hover:bg-slate-800 transition-colors ml-1"
            >
              <app-icon [name]="isSectionVisible(secId) ? 'eye' : 'eye-off'" [size]="16"></app-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TabSectionsComponent {
  readonly state = inject(PortfolioStateService);

  getSectionTitle(secId: SectionType): string {
    const s = this.state.portfolio()[secId] as any;
    return s?.title || s?.name || secId;
  }

  isSectionVisible(secId: SectionType): boolean {
    const s = this.state.portfolio()[secId] as any;
    return s?.visible ?? true;
  }

  toggleVisibility(secId: SectionType, event: Event) {
    event.stopPropagation();
    this.state.toggleSectionVisibility(secId);
  }

  moveUp(secId: SectionType, event: Event) {
    event.stopPropagation();
    this.state.moveSectionUp(secId);
  }

  moveDown(secId: SectionType, event: Event) {
    event.stopPropagation();
    this.state.moveSectionDown(secId);
  }

  drop(event: CdkDragDrop<string[]>) {
    const order = [...this.state.portfolio().sectionOrder];
    moveItemInArray(order, event.previousIndex, event.currentIndex);
    this.state.reorderSections(order);
  }
}
