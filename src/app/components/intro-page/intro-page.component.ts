import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="min-h-[calc(100vh-4rem)] w-full bg-slate-950 text-slate-100 flex flex-col justify-between select-none">
      
      <!-- HERO BANNER SECTION WITH SMART ANIMATED GLOW -->
      <header class="relative py-16 sm:py-20 px-6 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950">
        <!-- Glowing background light effects -->
        <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-600/20 via-purple-600/25 to-pink-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div class="absolute top-1/3 -left-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div class="absolute top-1/3 -right-20 w-80 h-80 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div class="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          
          <!-- Animated Tag Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/10">
            <app-icon name="sparkles" [size]="14" class="text-pink-400 animate-pulse"></app-icon>
            <span>NEXT-GEN PORTFOLIO BUILDER</span>
          </div>

          <!-- Hero Heading -->
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-white">
            Build Your Dream <br class="hidden sm:inline" />
            <span class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Developer Portfolio
            </span>
            In Minutes
          </h1>

          <!-- Hero Subtitle -->
          <p class="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Choose a professional state-of-the-art template, customize every detail with live preview, and export a 100% clean, self-contained website package ready to host anywhere.
          </p>

          <!-- Action & Launch Button -->
          <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              (click)="editTemplate1()"
              [class.scale-95]="isLaunching"
              [class.opacity-80]="isLaunching"
              class="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-sm font-extrabold shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer btn-shimmer-glow overflow-hidden"
            >
              <app-icon name="sparkles" [size]="18" class="group-hover:rotate-12 transition-transform duration-300"></app-icon>
              <span>Explore & Edit Template 1</span>
              <app-icon name="arrow-right" [size]="16" class="group-hover:translate-x-1.5 transition-transform duration-300"></app-icon>
            </button>
          </div>

          <!-- Feature Highlights Bar -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80 max-w-4xl mx-auto">
            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-center backdrop-blur-sm">
              <div class="text-indigo-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <app-icon name="eye" [size]="14"></app-icon> Real-Time Preview
              </div>
              <p class="text-[11px] text-slate-400">Instant visual feedback on every edit</p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-center backdrop-blur-sm">
              <div class="text-purple-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <app-icon name="palette" [size]="14"></app-icon> 11+ Color Themes
              </div>
              <p class="text-[11px] text-slate-400">Cyber neon, dark, light & presets</p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-center backdrop-blur-sm">
              <div class="text-pink-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <app-icon name="sliders-horizontal" [size]="14"></app-icon> Modular Sections
              </div>
              <p class="text-[11px] text-slate-400">Reorder, hide & customize sections</p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-center backdrop-blur-sm">
              <div class="text-emerald-400 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1">
                <app-icon name="download" [size]="14"></app-icon> Clean ZIP Export
              </div>
              <p class="text-[11px] text-slate-400">Standalone HTML5, CSS & JS output</p>
            </div>
          </div>

        </div>
      </header>

      <!-- TEMPLATES GALLERY SHOWCASE -->
      <section class="py-16 px-6 max-w-6xl mx-auto w-full space-y-8">
        <div class="text-center space-y-2">
          <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Available Portfolio Template
          </h2>
          <p class="text-sm text-slate-400 max-w-lg mx-auto">
            Select Template 1 below to launch the editor and customize your personal portfolio website.
          </p>
        </div>

        <!-- TEMPLATE 1 CARD (PRIMARY SHOWCASE) -->
        <div class="rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl space-y-0 transition-all hover:border-indigo-500/50 flex flex-col lg:flex-row">
          
          <!-- TEMPLATE 1 IMAGE CAROUSEL / SLIDESHOW (LEFT / TOP) -->
          <div class="lg:w-7/12 relative bg-slate-950 p-4 sm:p-6 flex flex-col justify-between space-y-4 border-b lg:border-b-0 lg:border-r border-slate-800">
            
            <!-- Main Active Carousel Image Frame -->
            <div class="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl group">
              <img
                [src]="template1Images[activeImageIndex]"
                [alt]="'Template 1 Preview ' + (activeImageIndex + 1)"
                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              
              <!-- Image Index Counter Badge -->
              <div class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-slate-200 border border-slate-800">
                {{ activeImageIndex + 1 }} / {{ template1Images.length }}
              </div>

              <!-- Carousel Navigation Chevron Overlay Buttons -->
              <button
                (click)="prevImage()"
                class="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-700/80 transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-lg active:scale-90"
                title="Previous Preview Image"
              >
                <app-icon name="chevron-left" [size]="20"></app-icon>
              </button>

              <button
                (click)="nextImage()"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-700/80 transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-lg active:scale-90"
                title="Next Preview Image"
              >
                <app-icon name="chevron-right" [size]="20"></app-icon>
              </button>
            </div>

            <!-- Thumbnails Navigation Bar -->
            <div class="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1">
              <button
                *ngFor="let img of template1Images; let idx = index"
                (click)="setImageIndex(idx)"
                class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 relative"
                [ngClass]="activeImageIndex === idx ? 'border-indigo-500 scale-105 shadow-md shadow-indigo-500/20' : 'border-slate-800 opacity-60 hover:opacity-100'"
              >
                <img [src]="img" [alt]="'Thumb ' + (idx + 1)" class="w-full h-full object-cover object-top" />
              </button>
            </div>
          </div>

          <!-- TEMPLATE 1 DETAILS & EDIT BUTTON (RIGHT / BOTTOM) -->
          <div class="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider">
                  Featured Template
                </span>
                <span class="text-xs text-slate-400 font-mono">Template 1</span>
              </div>

              <h3 class="text-2xl sm:text-3xl font-extrabold text-white">Template 1</h3>
              
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                A high-impact, modern software developer portfolio template designed for full-stack architects, engineers, and digital creators.
              </p>

              <!-- Included Sections List -->
              <div class="space-y-2 pt-2">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Included Sections & Features:</span>
                <ul class="text-xs text-slate-300 space-y-1.5 font-medium">
                  <li class="flex items-center gap-2"><app-icon name="sparkles" [size]="13" class="text-indigo-400"></app-icon> Dynamic Hero Banner & Profile Avatar</li>
                  <li class="flex items-center gap-2"><app-icon name="sparkles" [size]="13" class="text-indigo-400"></app-icon> Personal Bio & Custom Highlight Badges</li>
                  <li class="flex items-center gap-2"><app-icon name="sparkles" [size]="13" class="text-indigo-400"></app-icon> Core Tech Stack Matrix with Percentages</li>
                  <li class="flex items-center gap-2"><app-icon name="sparkles" [size]="13" class="text-indigo-400"></app-icon> Career Experience Timeline</li>
                  <li class="flex items-center gap-2"><app-icon name="sparkles" [size]="13" class="text-indigo-400"></app-icon> Project Showcase (Live Demo & GitHub Links)</li>
                  <li class="flex items-center gap-2"><app-icon name="sparkles" [size]="13" class="text-indigo-400"></app-icon> Education & Industry Certifications</li>
                </ul>
              </div>
            </div>

            <!-- EDIT TEMPLATE BUTTON -->
            <div class="pt-4 border-t border-slate-800 space-y-3">
              <button
                (click)="editTemplate1()"
                [class.scale-95]="isLaunching"
                [class.opacity-80]="isLaunching"
                class="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white text-sm font-extrabold shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 cursor-pointer btn-shimmer-glow overflow-hidden"
              >
                <app-icon name="sliders-horizontal" [size]="18" class="group-hover:rotate-12 transition-transform duration-300"></app-icon>
                <span>Edit Template 1</span>
                <app-icon name="arrow-right" [size]="16" class="group-hover:translate-x-1.5 transition-transform duration-300"></app-icon>
              </button>
            </div>

          </div>

        </div>

      </section>

      <!-- STICKY FOOTER -->
      <footer class="sticky bottom-0 z-40 py-4 px-6 border-t border-slate-800/80 text-center text-xs text-slate-400 bg-slate-950/90 backdrop-blur-md">
        <p>Developed By <a href="https://gangadharpepakayala.netlify.app/" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-400 font-bold text-slate-300 underline underline-offset-2 transition-colors">Gangadhar</a></p>
      </footer>

    </div>
  `,
})
export class IntroPageComponent implements OnInit, OnDestroy {
  readonly router = inject(Router);

  readonly template1Images: string[] = [
    'TemplateImages/Template1/Img1.png',
    'TemplateImages/Template1/Img2.png',
    'TemplateImages/Template1/Img3.png',
    'TemplateImages/Template1/img4.png',
    'TemplateImages/Template1/Img5.png',
  ];

  activeImageIndex = 0;
  isLaunching = false;
  private autoPlayTimer: any = null;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      this.nextImage();
    }, 4000);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  nextImage() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.template1Images.length;
  }

  prevImage() {
    this.activeImageIndex =
      (this.activeImageIndex - 1 + this.template1Images.length) % this.template1Images.length;
  }

  setImageIndex(index: number) {
    this.activeImageIndex = index;
    this.startAutoPlay();
  }

  editTemplate1() {
    if (this.isLaunching) return;
    this.isLaunching = true;
    setTimeout(() => {
      this.router.navigate(['/editor']);
      this.isLaunching = false;
    }, 150);
  }
}
