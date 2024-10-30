import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutinasModificarPageRoutingModule } from './rutinas-modificar-routing.module';

import { RutinasModificarPage } from './rutinas-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutinasModificarPageRoutingModule
  ],
  declarations: [RutinasModificarPage]
})
export class RutinasModificarPageModule {}
