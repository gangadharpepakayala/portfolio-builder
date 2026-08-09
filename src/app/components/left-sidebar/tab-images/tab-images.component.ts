import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-tab-images',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-4">
      <div>
        <h2 class="text-sm font-bold text-slate-100 uppercase tracking-wider">Image Manager</h2>
        <p class="text-xs text-slate-400 mt-1">Upload profile pictures, project cards & about section images.</p>
      </div>

      <!-- Profile Avatar Image Settings -->
      <div class="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
        <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wide">Hero Profile Picture</h3>

        <div class="flex items-center gap-3">
          <img
            [src]="state.portfolio().hero.profileImage"
            alt="Profile Preview"
            class="w-16 h-16 object-cover rounded-xl border border-slate-700 bg-slate-800"
          />

          <div class="flex-1 space-y-2">
            <label class="block cursor-pointer">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors">
                <app-icon name="upload" [size]="14"></app-icon> Upload New Image
              </span>
              <input type="file" accept="image/*" (change)="onProfileImageUpload($event)" class="hidden" />
            </label>
            <p class="text-[10px] text-slate-400">Supports JPG, PNG, WebP (Base64 stored)</p>
          </div>
        </div>

        <div class="space-y-1.5 pt-2 border-t border-slate-800">
          <label class="text-xs font-semibold text-slate-300">Image Shape</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              *ngFor="let shape of ['circle', 'rounded', 'square']"
              (click)="setShape(shape)"
              [class.bg-indigo-600]="state.portfolio().hero.imageShape === shape"
              [class.text-white]="state.portfolio().hero.imageShape === shape"
              [class.bg-slate-800]="state.portfolio().hero.imageShape !== shape"
              [class.text-slate-300]="state.portfolio().hero.imageShape !== shape"
              class="py-1.5 text-xs font-semibold rounded-lg capitalize border border-slate-700 transition-colors"
            >
              {{ shape }}
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between pt-1">
          <label class="text-xs font-semibold text-slate-300">Accent Border</label>
          <input
            type="checkbox"
            [checked]="state.portfolio().hero.imageBorder"
            (change)="toggleBorder($event)"
            class="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="text-xs font-semibold text-slate-300">Drop Shadow</label>
          <input
            type="checkbox"
            [checked]="state.portfolio().hero.imageShadow"
            (change)="toggleShadow($event)"
            class="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
          />
        </div>
      </div>

      <!-- About Section Image -->
      <div class="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-3">
        <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wide">About Section Image</h3>
        <div class="flex items-center gap-3">
          <img
            [src]="state.portfolio().about.image"
            alt="About Preview"
            class="w-16 h-12 object-cover rounded-lg border border-slate-700 bg-slate-800"
          />
          <label class="block cursor-pointer">
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700">
              <app-icon name="image" [size]="14"></app-icon> Change Image
            </span>
            <input type="file" accept="image/*" (change)="onAboutImageUpload($event)" class="hidden" />
          </label>
        </div>
      </div>
    </div>
  `,
})
export class TabImagesComponent {
  readonly state = inject(PortfolioStateService);

  onProfileImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.state.updateHero({ profileImage: result });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onAboutImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.state.updateAbout({ image: result });
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  setShape(shape: any) {
    this.state.updateHero({ imageShape: shape });
  }

  toggleBorder(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.state.updateHero({ imageBorder: checked });
  }

  toggleShadow(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.state.updateHero({ imageShadow: checked });
  }
}
