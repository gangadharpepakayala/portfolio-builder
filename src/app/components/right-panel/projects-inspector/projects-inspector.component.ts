import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../../core/services/portfolio-state.service';
import { ProjectItem, ProjectsSection } from '../../../core/models/portfolio.model';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ImagePickerComponent } from '../../../shared/components/image-picker/image-picker.component';

@Component({
  selector: 'app-projects-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ImagePickerComponent],
  template: `
    <div class="space-y-5">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 class="text-sm font-bold text-indigo-400 uppercase tracking-wider">Projects Section</h3>
        <div class="flex items-center gap-2">
          <button
            type="button"
            (click)="state.toggleSectionVisibility('projects')"
            class="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer shadow-sm"
            [ngClass]="state.portfolio().projects.visible ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-rose-950/80 border-rose-800 text-rose-300 hover:bg-rose-900'"
            [title]="state.portfolio().projects.visible ? 'Hide Projects section' : 'Show Projects section'"
          >
            <app-icon [name]="state.portfolio().projects.visible ? 'eye' : 'eye-off'" [size]="14"></app-icon>
            <span>{{ state.portfolio().projects.visible ? 'Hide Section' : 'Show Section' }}</span>
          </button>
          <button
            (click)="addProject()"
            class="flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <app-icon name="plus" [size]="14"></app-icon> Add Project
          </button>
        </div>
      </div>

      <!-- Title & Title Color -->
      <div class="space-y-1.5">
        <div class="flex justify-between items-center">
          <label class="text-xs font-bold text-slate-200">Section Title</label>
          <div class="flex items-center gap-1.5">
            <span class="text-xs text-slate-400">Title Color</span>
            <input
              type="color"
              [value]="projectsSection.titleColor || state.portfolio().colors.heading"
              (input)="updateSection({ titleColor: $any($event.target).value })"
              class="w-7 h-7 rounded-lg border border-slate-700 bg-transparent cursor-pointer p-0.5"
            />
            <button
              *ngIf="projectsSection.titleColor"
              (click)="updateSection({ titleColor: undefined })"
              class="p-1 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Reset Title Color to default"
            >
              <app-icon name="rotate-ccw" [size]="14"></app-icon>
            </button>
          </div>
        </div>
        <input
          type="text"
          [ngModel]="projectsSection.title"
          (ngModelChange)="updateSection({ title: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Subtitle -->
      <div class="space-y-1.5">
        <label class="text-xs font-bold text-slate-200">Subtitle</label>
        <input
          type="text"
          [ngModel]="projectsSection.subtitle"
          (ngModelChange)="updateSection({ subtitle: $event })"
          class="w-full bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <!-- Project Cards List (trackBy: trackById prevents DOM input focus loss) -->
      <div class="space-y-4 pt-2">
        <div
          *ngFor="let p of projectsSection.projects; let i = index; trackBy: trackById"
          class="p-4 rounded-xl border border-slate-800 bg-slate-900/70 space-y-3 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-slate-200">Project #{{ i + 1 }}: {{ p.title || 'Untitled' }}</span>
            <button
              (click)="deleteProject(p.id, p.title)"
              class="flex items-center gap-1 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-slate-800 px-2.5 py-1 rounded transition-colors cursor-pointer"
              title="Delete Project Card"
            >
              <app-icon name="trash-2" [size]="14"></app-icon> Delete Project
            </button>
          </div>

          <div class="space-y-2.5">
            <input
              type="text"
              placeholder="Project Title"
              [ngModel]="p.title"
              (ngModelChange)="updateProjectItem(p.id, { title: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs font-bold text-slate-100 rounded-lg p-2.5"
            />

            <textarea
              rows="3"
              placeholder="Description"
              [ngModel]="p.description"
              (ngModelChange)="updateProjectItem(p.id, { description: $event })"
              class="w-full bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg p-2.5"
            ></textarea>

            <!-- Cover Image Picker (Upload File OR Image Link) -->
            <app-image-picker
              label="Cover Image"
              [imageUrl]="p.image"
              (imageUrlChange)="updateProjectItem(p.id, { image: $event })"
            ></app-image-picker>

            <!-- Tech Stack / Project Tags Editor -->
            <div class="space-y-1 pt-1">
              <label class="text-[10px] font-bold text-slate-400">Tech Stack / Project Tags (Comma Separated)</label>
              <input
                type="text"
                placeholder="Angular, RxJS, Stripe API, TailwindCSS"
                [ngModel]="getTagsString(p.tags)"
                (ngModelChange)="updateProjectTags(p.id, $event)"
                class="w-full bg-slate-950 border border-slate-700 text-xs font-semibold text-indigo-300 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <!-- Project Links & Buttons (Hide / Show & Delete Options) -->
            <div class="space-y-2.5 pt-2 border-t border-slate-800">
              <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Project Link Buttons</span>

              <!-- Live Demo Link Controls -->
              <div class="p-2.5 rounded-lg border border-slate-800 bg-slate-950/80 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <app-icon name="globe" [size]="13" class="text-indigo-400"></app-icon> Live Demo Link
                  </span>
                  <div class="flex items-center gap-1.5">
                    <!-- Hide / Show Toggle Button -->
                    <button
                      type="button"
                      (click)="updateProjectItem(p.id, { showLiveDemo: p.showLiveDemo === false ? true : false })"
                      class="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-colors cursor-pointer"
                      [ngClass]="p.showLiveDemo !== false ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/50' : 'bg-slate-800 text-slate-400 border border-slate-700'"
                      [title]="p.showLiveDemo !== false ? 'Hide Live Demo button' : 'Show Live Demo button'"
                    >
                      <app-icon [name]="p.showLiveDemo !== false ? 'eye' : 'eye-off'" [size]="12"></app-icon>
                      {{ p.showLiveDemo !== false ? 'Visible' : 'Hidden' }}
                    </button>
                    <!-- Delete / Clear Button -->
                    <button
                      type="button"
                      (click)="updateProjectItem(p.id, { liveDemoUrl: '', showLiveDemo: false })"
                      class="flex items-center gap-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 hover:bg-slate-800 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                      title="Clear URL & Delete Live Demo Button"
                    >
                      <app-icon name="trash-2" [size]="12"></app-icon>
                      Delete
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Live Demo URL (e.g. https://example.com)"
                  [ngModel]="p.liveDemoUrl"
                  (ngModelChange)="updateProjectItem(p.id, { liveDemoUrl: $event })"
                  class="w-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <!-- GitHub Repo Link Controls -->
              <div class="p-2.5 rounded-lg border border-slate-800 bg-slate-950/80 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <app-icon name="github" [size]="13" class="text-indigo-400"></app-icon> GitHub Repo Link
                  </span>
                  <div class="flex items-center gap-1.5">
                    <!-- Hide / Show Toggle Button -->
                    <button
                      type="button"
                      (click)="updateProjectItem(p.id, { showGithub: p.showGithub === false ? true : false })"
                      class="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded transition-colors cursor-pointer"
                      [ngClass]="p.showGithub !== false ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/50' : 'bg-slate-800 text-slate-400 border border-slate-700'"
                      [title]="p.showGithub !== false ? 'Hide GitHub button' : 'Show GitHub button'"
                    >
                      <app-icon [name]="p.showGithub !== false ? 'eye' : 'eye-off'" [size]="12"></app-icon>
                      {{ p.showGithub !== false ? 'Visible' : 'Hidden' }}
                    </button>
                    <!-- Delete / Clear Button -->
                    <button
                      type="button"
                      (click)="updateProjectItem(p.id, { githubUrl: '', showGithub: false })"
                      class="flex items-center gap-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 hover:bg-slate-800 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
                      title="Clear URL & Delete GitHub Button"
                    >
                      <app-icon name="trash-2" [size]="12"></app-icon>
                      Delete
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="GitHub Repo URL (e.g. https://github.com/user/repo)"
                  [ngModel]="p.githubUrl"
                  (ngModelChange)="updateProjectItem(p.id, { githubUrl: $event })"
                  class="w-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 rounded-md p-2 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProjectsInspectorComponent {
  readonly state = inject(PortfolioStateService);

  get projectsSection(): ProjectsSection {
    return this.state.portfolio().projects;
  }

  trackById(_: number, item: ProjectItem): string {
    return item.id;
  }

  getTagsString(tags: string[] | undefined): string {
    return Array.isArray(tags) ? tags.join(', ') : '';
  }

  updateProjectTags(id: string, value: string) {
    const tags = value
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    this.updateProjectItem(id, { tags });
  }

  updateSection(partial: Partial<ProjectsSection>) {
    this.state.updateProjects(partial);
  }

  addProject() {
    const newProject: ProjectItem = {
      id: Date.now().toString(),
      title: 'New Portfolio Project',
      description: 'A brief description of this new portfolio showcase project.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      githubUrl: 'https://github.com',
      liveDemoUrl: 'https://example.com',
      tags: ['Angular', 'TypeScript', 'TailwindCSS'],
      featured: true,
      showLiveDemo: true,
      showGithub: true,
    };
    this.updateSection({
      projects: [...this.projectsSection.projects, newProject],
    });
  }

  deleteProject(id: string, title: string) {
    if (confirm(`Are you sure you want to delete the project card '${title || 'Untitled'}'?`)) {
      this.updateSection({
        projects: this.projectsSection.projects.filter((p) => p.id !== id),
      });
    }
  }

  updateProjectItem(id: string, partial: Partial<ProjectItem>) {
    const updated = this.projectsSection.projects.map((p) => (p.id === id ? { ...p, ...partial } : p));
    this.updateSection({ projects: updated });
  }
}
