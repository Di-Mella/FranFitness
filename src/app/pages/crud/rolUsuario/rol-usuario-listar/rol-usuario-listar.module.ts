import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolUsuarioListarPageRoutingModule } from './rol-usuario-listar-routing.module';

import { RolUsuarioListarPage } from './rol-usuario-listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolUsuarioListarPageRoutingModule
  ],
  declarations: [RolUsuarioListarPage]
})
export class RolUsuarioListarPageModule {}
