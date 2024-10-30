import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutinasAgregarPageRoutingModule } from './rutinas-agregar-routing.module';

import { RutinasAgregarPage } from './rutinas-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutinasAgregarPageRoutingModule
  ],
  declarations: [RutinasAgregarPage]
})
export class RutinasAgregarPageModule {}
