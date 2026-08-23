import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { NavbarSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-navbar-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-5">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">Navbar & Menu Links</h3>
          <span class="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold">navbar</span>
        </div>
        <button
          type="button"
          (click)="state.toggleSectionVisibility('navbar')"
          class="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer shadow-sm"
          [ngClass]="state.portfolio().navbar.visible ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-rose-950/80 border-rose-800 text-rose-300 hover:bg-rose-900'"
          [title]="state.portfolio().navbar.visible ? 'Hide Navbar section' : 'Show Navbar section'"
        >
          <app-icon [name]="state.portfolio().navbar.visible ? 'eye' : 'eye-off'" [size]="14"></app-icon>
          <span>{{ state.portfolio().navbar.visible ? 'Hide Section' : 'Show Section' }}</span>
        </button>
      </div>

      <!-- Logo Text & Logo Color -->
      <div class="space-y-1.5">
        <div class="flex justify-between items-center">
          <label class="text-xs font-bold text-slate-200">Logo Text / Brand Name</label>
          <div class="flex items-center gap-1.5">
            <span class="text-xs text-slate-400">Logo Color</span>
            <input
              type="color"
              [value]="navbar.logoColor || state.portfolio().colors.heading"
              (input)="update({ logoColor: $any($event.target).value })"
              class="w-7 h-7 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
            <button
              *ngIf="navbar.logoColor"
              (click)="update({ logoColor: undefined })"
              class="p-1 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Reset Logo Color to default"
            >
              <app-icon name="rotate-ccw" [size]="14"></app-icon>
            </button>
          </div>
        </div>
        <input
          type="text"
          [ngModel]="navbar.logoText"
          (ngModelChange)="update({ logoText: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Navbar Fill Color -->
      <div class="flex justify-between items-center p-3 rounded-xl border border-slate-800 bg-slate-900/60">
        <label class="text-xs font-bold text-slate-200">Navbar Fill Color</label>
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono text-slate-400">{{ navbar.bgColor || state.portfolio().colors.navbarBg }}</span>
          <input
            type="color"
            [value]="navbar.bgColor || state.portfolio().colors.navbarBg"
            (input)="update({ bgColor: $any($event.target).value })"
            class="w-8 h-8 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
          />
          <button
            *ngIf="navbar.bgColor"
            (click)="update({ bgColor: undefined })"
            class="p-1 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Reset Navbar Fill Color to default"
          >
            <app-icon name="rotate-ccw" [size]="14"></app-icon>
          </button>
        </div>
      </div>

      <!-- Navigation Menu Items List -->
      <div class="space-y-3 pt-2 border-t border-slate-800">
        <div class="flex items-center justify-between">
          <label class="text-xs font-extrabold text-slate-100 uppercase tracking-wide">Menu Links & Labels</label>
          <button
            (click)="addLink()"
            class="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <app-icon name="plus" [size]="14"></app-icon> Add Link
          </button>
        </div>

        <p class="text-xs text-slate-400">Edit menu link names below to update the header navigation instantly.</p>

        <div class="space-y-2.5 pt-1">
          <div
            *ngFor="let link of navbar.links; let i = index"
            class="flex items-center gap-2.5 p-3 rounded-xl border border-slate-800 bg-slate-900/70 shadow-sm"
          >
            <div class="flex-1 space-y-1">
              <label class="text-[10px] font-semibold text-slate-400">Display Label</label>
              <input
                type="text"
                [ngModel]="link.label"
                (ngModelChange)="updateLink(i, { label: $event })"
                placeholder="Link Name"
                class="w-full bg-slate-950 border border-slate-700 text-sm font-bold text-slate-100 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div class="w-28 space-y-1">
              <label class="text-[10px] font-semibold text-slate-400">Target ID</label>
              <input
                type="text"
                [ngModel]="link.sectionId"
                (ngModelChange)="updateLink(i, { sectionId: $event })"
                placeholder="#section"
                class="w-full bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 rounded-lg p-2"
              />
            </div>

            <div class="flex items-center gap-1 pt-4">
              <!-- Toggle Link Visibility -->
              <button
                (click)="updateLink(i, { visible: !link.visible })"
                [class.text-emerald-400]="link.visible"
                [class.text-slate-600]="!link.visible"
                class="p-1.5 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Toggle Menu Link Visibility"
              >
                <app-icon [name]="link.visible ? 'eye' : 'eye-off'" [size]="18"></app-icon>
              </button>

              <!-- Delete Link -->
              <button
                (click)="deleteLink(i, link.label)"
                class="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Delete Link"
              >
                <app-icon name="trash-2" [size]="18"></app-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Toggles -->
      <div class="space-y-3 pt-3 border-t border-slate-800">
        <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-900/40">
          <label class="text-xs font-bold text-slate-200">Sticky Top Navbar</label>
          <input
            type="checkbox"
            [checked]="navbar.isSticky"
            (change)="toggleProp('isSticky', $event)"
            class="w-5 h-5 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
          />
        </div>

        <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-900/40">
          <label class="text-xs font-bold text-slate-200">Transparent Glass Effect</label>
          <input
            type="checkbox"
            [checked]="navbar.isTransparent"
            (change)="toggleProp('isTransparent', $event)"
            class="w-5 h-5 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  `,
})
export class NavbarInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get navbar(): NavbarSection {
    return this.state.portfolio().navbar;
  }

  update(partial: Partial<NavbarSection>) {
    this.state.updateNavbar(partial);
  }

  updateLink(index: number, partial: Partial<{ label: string; sectionId: string; visible: boolean }>) {
    const updatedLinks = [...this.navbar.links];
    updatedLinks[index] = { ...updatedLinks[index], ...partial };
    this.update({ links: updatedLinks });
  }

  addLink() {
    const newLink = { label: 'New Link', sectionId: 'contact', visible: true };
    this.update({ links: [...this.navbar.links, newLink] });
  }

  deleteLink(index: number, label: string) {
    if (confirm(`Are you sure you want to delete the navigation link '${label || 'New Link'}'?`)) {
      const updatedLinks = this.navbar.links.filter((_, i) => i !== index);
      this.update({ links: updatedLinks });
    }
  }

  toggleProp(key: keyof NavbarSection, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.update({ [key]: checked });
  }
}
