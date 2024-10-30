import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanesMembresiaModificarPage } from './planes-membresia-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: PlanesMembresiaModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanesMembresiaModificarPageRoutingModule {}
