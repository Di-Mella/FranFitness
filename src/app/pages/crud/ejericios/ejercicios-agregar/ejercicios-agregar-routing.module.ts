import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjerciciosAgregarPage } from './ejercicios-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: EjerciciosAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjerciciosAgregarPageRoutingModule {}
