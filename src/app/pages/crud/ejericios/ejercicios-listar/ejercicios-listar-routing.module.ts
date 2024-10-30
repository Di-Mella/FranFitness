import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjerciciosListarPage } from './ejercicios-listar.page';

const routes: Routes = [
  {
    path: '',
    component: EjerciciosListarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjerciciosListarPageRoutingModule {}
