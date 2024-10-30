import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjerciciosModificarPage } from './ejercicios-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: EjerciciosModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjerciciosModificarPageRoutingModule {}
