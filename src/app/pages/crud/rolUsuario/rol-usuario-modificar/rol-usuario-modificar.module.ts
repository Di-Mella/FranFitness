import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolUsuarioModificarPageRoutingModule } from './rol-usuario-modificar-routing.module';

import { RolUsuarioModificarPage } from './rol-usuario-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolUsuarioModificarPageRoutingModule
  ],
  declarations: [RolUsuarioModificarPage]
})
export class RolUsuarioModificarPageModule {}
