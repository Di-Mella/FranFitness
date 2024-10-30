import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosListarPageRoutingModule } from './usuarios-listar-routing.module';

import { UsuariosListarPage } from './usuarios-listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosListarPageRoutingModule
  ],
  declarations: [UsuariosListarPage]
})
export class UsuariosListarPageModule {}
