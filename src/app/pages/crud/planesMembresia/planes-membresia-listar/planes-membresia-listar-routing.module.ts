import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanesMembresiaListarPage } from './planes-membresia-listar.page';

const routes: Routes = [
  {
    path: '',
    component: PlanesMembresiaListarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanesMembresiaListarPageRoutingModule {}
