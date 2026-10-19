import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArquivosComponent } from './arquivos/arquivos.component';
import { UnidadeComponent } from './unidades/unidade.component';
import { ParceirosComponent } from './parceiros/parceiros.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'arquivos', component: ArquivosComponent },
  { path: 'parceiros', component: ParceirosComponent },
  { path: 'unidades/:cidade', component: UnidadeComponent },
  { path: 'unidades', redirectTo: 'unidades/barreiras', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
