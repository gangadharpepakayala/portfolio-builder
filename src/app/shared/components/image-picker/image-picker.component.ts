import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-image-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-2 p-3 rounded-xl border border-slate-800 bg-slate-900/60">
      <div class="flex items-center justify-between">
        <label *ngIf="label" class="text-xs font-bold text-slate-200">{{ label }}</label>
        
        <!-- Tab Selector: Upload File vs Image Link -->
        <div class="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            (click)="mode = 'upload'"
            [class.bg-indigo-600]="mode === 'upload'"
            [class.text-white]="mode === 'upload'"
            [class.text-slate-400]="mode !== 'upload'"
            class="px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer"
          >
            Upload File
          </button>
          <button
            type="button"
            (click)="mode = 'url'"
            [class.bg-indigo-600]="mode === 'url'"
            [class.text-white]="mode === 'url'"
            [class.text-slate-400]="mode !== 'url'"
            class="px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer"
          >
            Image Link
          </button>
        </div>
      </div>

      <!-- Mode 1: Local File Upload -->
      <div *ngIf="mode === 'upload'" class="space-y-2">
        <div class="flex items-center gap-2">
          <label class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-950 hover:bg-slate-800 border border-dashed border-slate-700 hover:border-indigo-500 rounded-lg text-xs font-bold text-indigo-400 cursor-pointer transition-colors">
            <app-icon name="upload" [size]="14"></app-icon>
            <span>Choose Image File...</span>
            <input type="file" accept="image/*" (change)="onFileSelected($event)" class="hidden" />
          </label>

          <button
            *ngIf="imageUrl"
            type="button"
            (click)="clearImage()"
            class="p-2 text-rose-400 hover:text-rose-300 bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            title="Clear Image"
          >
            <app-icon name="trash-2" [size]="14"></app-icon>
          </button>
        </div>
      </div>

      <!-- Mode 2: Direct Image URL Link -->
      <div *ngIf="mode === 'url'" class="space-y-2">
        <div class="flex items-center gap-2">
          <input
            type="text"
            [ngModel]="imageUrl"
            (ngModelChange)="onUrlChanged($event)"
            placeholder="Paste image URL (https://...)"
            class="flex-1 bg-slate-950 border border-slate-700 text-xs font-mono text-slate-100 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
          />

          <button
            *ngIf="imageUrl"
            type="button"
            (click)="clearImage()"
            class="p-2 text-rose-400 hover:text-rose-300 bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
            title="Clear Image"
          >
            <app-icon name="trash-2" [size]="14"></app-icon>
          </button>
        </div>
      </div>

      <!-- Image Preview Badge -->
      <div *ngIf="imageUrl" class="flex items-center gap-2 pt-1">
        <img [src]="imageUrl" alt="Preview" class="w-10 h-10 rounded-lg object-cover border border-slate-700" />
        <span class="text-[10px] font-mono text-slate-400 truncate max-w-[240px]">{{ imageUrl }}</span>
      </div>
    </div>
  `,
})
export class ImagePickerComponent {
  @Input() label = 'Image Source';
  @Input() imageUrl = '';
  @Output() imageUrlChange = new EventEmitter<string>();

  mode: 'upload' | 'url' = 'upload';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (base64) {
          this.imageUrlChange.emit(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onUrlChanged(url: string) {
    this.imageUrlChange.emit(url);
  }

  clearImage() {
    this.imageUrlChange.emit('');
  }
}
