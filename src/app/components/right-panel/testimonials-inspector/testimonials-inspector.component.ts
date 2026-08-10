import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { TestimonialItem, TestimonialsSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-testimonials-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-5">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">Client & Peer Endorsements</h3>
        <button
          (click)="addTestimonial()"
          class="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
        >
          <app-icon name="plus" [size]="14"></app-icon> Add Endorsement Card
        </button>
      </div>

      <!-- Title & Title Color -->
      <div class="space-y-1.5">
        <div class="flex justify-between items-center">
          <label class="text-xs font-bold text-slate-200">Section Title</label>
          <div class="flex items-center gap-1.5">
            <span class="text-xs text-slate-400">Title Color</span>
            <input
              type="color"
              [value]="testSection.titleColor || state.portfolio().colors.heading"
              (input)="updateSection({ titleColor: $any($event.target).value })"
              class="w-7 h-7 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
          </div>
        </div>
        <input
          type="text"
          [ngModel]="testSection.title"
          (ngModelChange)="updateSection({ title: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Subtitle -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-200">Subtitle</label>
        <input
          type="text"
          [ngModel]="testSection.subtitle"
          (ngModelChange)="updateSection({ subtitle: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Section Background Fill -->
      <div class="flex justify-between items-center p-3 rounded-xl border border-slate-800 bg-slate-900/60">
        <label class="text-xs font-bold text-slate-200">Section Background Color</label>
        <input
          type="color"
          [value]="testSection.bgColor || state.portfolio().colors.sectionBg"
          (input)="updateSection({ bgColor: $any($event.target).value })"
          class="w-8 h-8 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
        />
      </div>

      <!-- Testimonials Cards List (trackBy: trackById prevents DOM input focus loss) -->
      <div class="space-y-4 pt-2">
        <div
          *ngFor="let item of testSection.testimonials; let i = index; trackBy: trackById"
          class="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-3 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-slate-200">Endorsement #{{ i + 1 }}: {{ item.name || 'Anonymous' }}</span>
            <button
              (click)="deleteTestimonial(item.id, item.name)"
              class="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Delete Endorsement Card"
            >
              <app-icon name="trash-2" [size]="16"></app-icon>
            </button>
          </div>

          <div class="space-y-2.5">
            <input
              type="text"
              placeholder="Client / Peer Name"
              [ngModel]="item.name"
              (ngModelChange)="updateItem(item.id, { name: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs font-bold text-slate-100 rounded-lg p-2.5"
            />

            <div class="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Job Role / Title"
                [ngModel]="item.role"
                (ngModelChange)="updateItem(item.id, { role: $event })"
                class="bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-100 rounded-lg p-2.5"
              />
              <input
                type="text"
                placeholder="Company / Organization"
                [ngModel]="item.company"
                (ngModelChange)="updateItem(item.id, { company: $event })"
                class="bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-100 rounded-lg p-2.5"
              />
            </div>

            <textarea
              rows="3"
              placeholder="Endorsement review content..."
              [ngModel]="item.content"
              (ngModelChange)="updateItem(item.id, { content: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs text-slate-100 rounded-lg p-2.5 leading-relaxed"
            ></textarea>

            <div class="space-y-1">
              <label class="text-[10px] font-bold text-slate-400">Avatar Image URL</label>
              <div class="flex items-center gap-2">
                <img [src]="item.avatar" class="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0" />
                <input
                  type="text"
                  placeholder="Avatar Image URL"
                  [ngModel]="item.avatar"
                  (ngModelChange)="updateItem(item.id, { avatar: $event })"
                  class="flex-1 bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 rounded-lg p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TestimonialsInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get testSection(): TestimonialsSection {
    return this.state.portfolio().testimonials;
  }

  trackById(_: number, item: TestimonialItem): string {
    return item.id;
  }

  updateSection(partial: Partial<TestimonialsSection>) {
    this.state.updateTestimonials(partial);
  }

  addTestimonial() {
    const newItem: TestimonialItem = {
      id: Date.now().toString(),
      name: 'Sarah Connor',
      role: 'VP of Product',
      company: 'InnovateX Labs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      content: 'An exceptional engineer who delivers sleek, high-performing frontend web applications on tight deadlines.',
      rating: 5,
    };
    this.updateSection({
      testimonials: [...this.testSection.testimonials, newItem],
    });
  }

  deleteTestimonial(id: string, name: string) {
    if (confirm(`Are you sure you want to delete the endorsement card from '${name || 'Anonymous'}'?`)) {
      this.updateSection({
        testimonials: this.testSection.testimonials.filter((t) => t.id !== id),
      });
    }
  }

  updateItem(id: string, partial: Partial<TestimonialItem>) {
    const updated = this.testSection.testimonials.map((t) => (t.id === id ? { ...t, ...partial } : t));
    this.updateSection({ testimonials: updated });
  }
}
