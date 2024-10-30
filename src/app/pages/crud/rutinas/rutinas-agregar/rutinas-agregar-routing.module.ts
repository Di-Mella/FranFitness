import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutinasAgregarPage } from './rutinas-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: RutinasAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutinasAgregarPageRoutingModule {}
