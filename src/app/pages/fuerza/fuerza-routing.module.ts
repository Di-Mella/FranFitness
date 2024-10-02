import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuerzaPage } from './fuerza.page';

const routes: Routes = [
  {
    path: '',
    component: FuerzaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuerzaPageRoutingModule {}
