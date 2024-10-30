import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutinasListarPage } from './rutinas-listar.page';

const routes: Routes = [
  {
    path: '',
    component: RutinasListarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutinasListarPageRoutingModule {}
