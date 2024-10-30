import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoMuscularListarPage } from './grupo-muscular-listar.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoMuscularListarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoMuscularListarPageRoutingModule {}
