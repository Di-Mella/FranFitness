import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolUsuarioListarPage } from './rol-usuario-listar.page';

const routes: Routes = [
  {
    path: '',
    component: RolUsuarioListarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolUsuarioListarPageRoutingModule {}
