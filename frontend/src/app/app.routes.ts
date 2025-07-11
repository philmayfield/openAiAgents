import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tell-joke',
    loadComponent: () => import('./tell-joke/tell-joke.component').then(m => m.TellJokeComponent),
  },
  {
    path: 'research',
    loadComponent: () => import('./research/research.component').then(m => m.ResearchComponent),
  },
  { path: '', redirectTo: 'tell-joke', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
