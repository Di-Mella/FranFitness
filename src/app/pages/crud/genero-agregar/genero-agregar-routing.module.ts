import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneroAgregarPage } from './genero-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: GeneroAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneroAgregarPageRoutingModule {}
