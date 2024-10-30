import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolUsuarioAgregarPageRoutingModule } from './rol-usuario-agregar-routing.module';

import { RolUsuarioAgregarPage } from './rol-usuario-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolUsuarioAgregarPageRoutingModule
  ],
  declarations: [RolUsuarioAgregarPage]
})
export class RolUsuarioAgregarPageModule {}
