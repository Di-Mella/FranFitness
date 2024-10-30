import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoMuscularModificarPage } from './grupo-muscular-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoMuscularModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoMuscularModificarPageRoutingModule {}
