import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanesMembresiaAgregarPage } from './planes-membresia-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: PlanesMembresiaAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanesMembresiaAgregarPageRoutingModule {}
