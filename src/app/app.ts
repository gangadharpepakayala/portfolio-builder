import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopToolbarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
