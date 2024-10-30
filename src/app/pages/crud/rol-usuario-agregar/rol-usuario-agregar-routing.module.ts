import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolUsuarioAgregarPage } from './rol-usuario-agregar.page';

const routes: Routes = [
  {
    path: '',
    component: RolUsuarioAgregarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolUsuarioAgregarPageRoutingModule {}
