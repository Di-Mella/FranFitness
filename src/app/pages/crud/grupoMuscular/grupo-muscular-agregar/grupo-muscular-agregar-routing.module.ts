import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoMuscularAgregarPage } from './grupo-muscular-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoMuscularAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoMuscularAgregarPageRoutingModule {}
