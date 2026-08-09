import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { ContactSection } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-contact-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-wider">Contact Section</h3>
        <span class="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono">#contact</span>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">Title</label>
        <input
          type="text"
          [ngModel]="contact.title"
          (ngModelChange)="update({ title: $event })"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded-lg p-2"
        />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">Subtitle</label>
        <input
          type="text"
          [ngModel]="contact.subtitle"
          (ngModelChange)="update({ subtitle: $event })"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded-lg p-2"
        />
      </div>

      <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-300">Email Address</label>
          <input
            type="email"
            [ngModel]="contact.email"
            (ngModelChange)="update({ email: $event })"
            class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-2"
          />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-300">Phone Number</label>
          <input
            type="text"
            [ngModel]="contact.phone"
            (ngModelChange)="update({ phone: $event })"
            class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-2"
          />
        </div>
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">Location Address</label>
        <input
          type="text"
          [ngModel]="contact.address"
          (ngModelChange)="update({ address: $event })"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-2"
        />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-semibold text-slate-300">Personal Website Domain</label>
        <input
          type="text"
          [ngModel]="contact.website"
          (ngModelChange)="update({ website: $event })"
          class="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 rounded p-2"
        />
      </div>
    </div>
  `,
})
export class ContactInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get contact(): ContactSection {
    return this.state.portfolio().contact;
  }

  update(partial: Partial<ContactSection>) {
    this.state.updateContact(partial);
  }
}
