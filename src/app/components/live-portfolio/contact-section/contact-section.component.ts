import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section
      *ngIf="state.portfolio().contact.visible"
      id="contact"
      (click)="selectContact($event)"
      [class.canvas-section-selected]="state.selectedSectionId() === 'contact'"
      data-section-title="Contact Section"
      class="w-full py-20 px-6 cursor-pointer transition-all border-t border-white/5"
      [style.backgroundColor]="state.portfolio().colors.sectionBg"
    >
      <div class="max-w-6xl mx-auto space-y-12">
        <div class="text-center space-y-2">
          <h2 class="text-3xl sm:text-4xl font-extrabold" [style.color]="state.portfolio().colors.heading">
            {{ state.portfolio().contact.title }}
          </h2>
          <p class="text-sm sm:text-base max-w-xl mx-auto" [style.color]="state.portfolio().colors.text">
            {{ state.portfolio().contact.subtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div class="lg:col-span-5 space-y-6">
            <div class="p-6 rounded-2xl border space-y-6" [style.backgroundColor]="state.portfolio().colors.cardBg" [style.borderColor]="state.portfolio().colors.borderColor">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-400">
                  <app-icon name="mail" [size]="20"></app-icon>
                </div>
                <div>
                  <div class="text-xs text-slate-400 font-semibold">Email Address</div>
                  <a [href]="'mailto:' + state.portfolio().contact.email" class="text-sm font-bold" [style.color]="state.portfolio().colors.heading">
                    {{ state.portfolio().contact.email }}
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-400">
                  <app-icon name="globe" [size]="20"></app-icon>
                </div>
                <div>
                  <div class="text-xs text-slate-400 font-semibold">Phone / Mobile</div>
                  <div class="text-sm font-bold" [style.color]="state.portfolio().colors.heading">
                    {{ state.portfolio().contact.phone }}
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-400">
                  <app-icon name="globe" [size]="20"></app-icon>
                </div>
                <div>
                  <div class="text-xs text-slate-400 font-semibold">Office Location</div>
                  <div class="text-sm font-bold" [style.color]="state.portfolio().colors.heading">
                    {{ state.portfolio().contact.address }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7">
            <form (submit)="$event.preventDefault()" class="p-8 rounded-2xl border space-y-4" [style.backgroundColor]="state.portfolio().colors.cardBg" [style.borderColor]="state.portfolio().colors.borderColor">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-slate-400">Your Name</label>
                  <input type="text" placeholder="John Doe" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none" />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-slate-400">Email Address</label>
                  <input type="email" placeholder="john@example.com" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none" />
                </div>
              </div>

              <div class="space-y-1">
                <label class="text-xs font-semibold text-slate-400">Message</label>
                <textarea rows="4" placeholder="Hello, I'd like to discuss a new project..." class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none"></textarea>
              </div>

              <button
                type="submit"
                class="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-lg active:scale-98"
                [style.backgroundColor]="state.portfolio().colors.button"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactSectionComponent {
  readonly state = inject(PortfolioStateService);

  selectContact(event: Event) {
    event.stopPropagation();
    this.state.selectSection('contact');
  }
}
