import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      [class]="class"
    >
      <ng-container [ngSwitch]="name?.toLowerCase()">
        <!-- github -->
        <ng-container *ngSwitchCase="'github'">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </ng-container>

        <!-- linkedin -->
        <ng-container *ngSwitchCase="'linkedin'">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </ng-container>

        <!-- twitter -->
        <ng-container *ngSwitchCase="'twitter'">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </ng-container>

        <!-- instagram -->
        <ng-container *ngSwitchCase="'instagram'">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </ng-container>

        <!-- youtube -->
        <ng-container *ngSwitchCase="'youtube'">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <polygon points="10 15 15 12 10 9 10 15" />
        </ng-container>

        <!-- code / leetcode / hackerrank / codechef / stackoverflow -->
        <ng-container *ngSwitchCase="'code'">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </ng-container>
        <ng-container *ngSwitchCase="'leetcode'">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </ng-container>
        <ng-container *ngSwitchCase="'codechef'">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </ng-container>
        <ng-container *ngSwitchCase="'hackerrank'">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </ng-container>
        <ng-container *ngSwitchCase="'stackoverflow'">
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
          <polyline points="16 18 22 12 16 6" />
        </ng-container>

        <!-- mail -->
        <ng-container *ngSwitchCase="'mail'">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </ng-container>

        <!-- layout-grid -->
        <ng-container *ngSwitchCase="'layout-grid'">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </ng-container>

        <!-- undo-2 -->
        <ng-container *ngSwitchCase="'undo-2'">
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
        </ng-container>

        <!-- redo-2 -->
        <ng-container *ngSwitchCase="'redo-2'">
          <path d="m15 14 5-5-5-5" />
          <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
        </ng-container>

        <!-- eye -->
        <ng-container *ngSwitchCase="'eye'">
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
          <circle cx="12" cy="12" r="3" />
        </ng-container>

        <!-- eye-off -->
        <ng-container *ngSwitchCase="'eye-off'">
          <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
          <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
          <path d="M17.479 17.499A10.75 10.75 0 0 1 2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.417-4.417" />
          <line x1="2" x2="22" y1="2" y2="22" />
        </ng-container>

        <!-- download -->
        <ng-container *ngSwitchCase="'download'">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </ng-container>

        <!-- rotate-ccw -->
        <ng-container *ngSwitchCase="'rotate-ccw'">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </ng-container>

        <!-- palette -->
        <ng-container *ngSwitchCase="'palette'">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </ng-container>

        <!-- droplet -->
        <ng-container *ngSwitchCase="'droplet'">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </ng-container>

        <!-- type -->
        <ng-container *ngSwitchCase="'type'">
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" x2="15" y1="20" y2="20" />
          <line x1="12" x2="12" y1="4" y2="20" />
        </ng-container>

        <!-- image -->
        <ng-container *ngSwitchCase="'image'">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </ng-container>

        <!-- layers -->
        <ng-container *ngSwitchCase="'layers'">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </ng-container>

        <!-- plus -->
        <ng-container *ngSwitchCase="'plus'">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </ng-container>

        <!-- trash-2 -->
        <ng-container *ngSwitchCase="'trash-2'">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </ng-container>

        <!-- grip-vertical -->
        <ng-container *ngSwitchCase="'grip-vertical'">
          <circle cx="9" cy="12" r="1" />
          <circle cx="9" cy="5" r="1" />
          <circle cx="9" cy="19" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="15" cy="5" r="1" />
          <circle cx="15" cy="19" r="1" />
        </ng-container>

        <!-- arrow-up -->
        <ng-container *ngSwitchCase="'arrow-up'">
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </ng-container>

        <!-- arrow-down -->
        <ng-container *ngSwitchCase="'arrow-down'">
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </ng-container>

        <!-- upload -->
        <ng-container *ngSwitchCase="'upload'">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </ng-container>

        <!-- file-archive -->
        <ng-container *ngSwitchCase="'file-archive'">
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
          <circle cx="10" cy="12" r="1" />
          <path d="M10 7h.01" />
          <path d="M10 9h.01" />
          <path d="M10 15h.01" />
          <path d="M10 17h.01" />
        </ng-container>

        <!-- sliders-horizontal -->
        <ng-container *ngSwitchCase="'sliders-horizontal'">
          <line x1="21" x2="14" y1="4" y2="4" />
          <line x1="10" x2="3" y1="4" y2="4" />
          <line x1="21" x2="12" y1="12" y2="12" />
          <line x1="8" x2="3" y1="12" y2="12" />
          <line x1="21" x2="16" y1="20" y2="20" />
          <line x1="12" x2="3" y1="20" y2="20" />
          <line x1="14" x2="14" y1="2" y2="6" />
          <line x1="8" x2="8" y1="10" y2="14" />
          <line x1="16" x2="16" y1="18" y2="22" />
        </ng-container>

        <!-- mouse-pointer-click -->
        <ng-container *ngSwitchCase="'mouse-pointer-click'">
          <path d="m9 9 5 12 1.8-5.2L21 14Z" />
          <path d="M7.2 2.2 8 5.1" />
          <path d="M5.1 7.2 2.2 8" />
          <path d="M14 4.1 12 6" />
          <path d="m6 12-1.9 2" />
        </ng-container>

        <!-- globe / default -->
        <ng-container *ngSwitchDefault>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </ng-container>
      </ng-container>
    </svg>
  `,
})
export class IconComponent {
  @Input() name = 'globe';
  @Input() size = 16;
  @Input() class = '';
}
