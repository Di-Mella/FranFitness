import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolUsuarioModificarPage } from './rol-usuario-modificar.page';

const routes: Routes = [
  {
    path: '',
    component: RolUsuarioModificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolUsuarioModificarPageRoutingModule {}
