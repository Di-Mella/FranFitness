import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneroModificarPage } from './genero-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: GeneroModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneroModificarPageRoutingModule {}
