import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlexibilidadPage } from './flexibilidad.page';

const routes: Routes = [
  {
    path: '',
    component: FlexibilidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlexibilidadPageRoutingModule {}
