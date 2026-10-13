import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArquivosComponent } from './arquivos/arquivos.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'arquivos', component: ArquivosComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
