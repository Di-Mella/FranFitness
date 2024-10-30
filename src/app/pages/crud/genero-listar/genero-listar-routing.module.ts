import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneroListarPage } from './genero-listar.page';

const routes: Routes = [
  {
    path: '',
    component: GeneroListarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneroListarPageRoutingModule {}
