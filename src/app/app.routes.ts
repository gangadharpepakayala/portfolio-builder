import { Routes } from '@angular/router';
import { IntroPageComponent } from './components/intro-page/intro-page.component';
import { EditorWorkspaceComponent } from './components/editor-workspace/editor-workspace.component';

export const routes: Routes = [
  { path: '', component: IntroPageComponent },
  { path: 'editor', component: EditorWorkspaceComponent },
  { path: '**', redirectTo: '' },
];
