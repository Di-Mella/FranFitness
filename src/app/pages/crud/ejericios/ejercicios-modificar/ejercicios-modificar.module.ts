import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjerciciosModificarPageRoutingModule } from './ejercicios-modificar-routing.module';

import { EjerciciosModificarPage } from './ejercicios-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EjerciciosModificarPageRoutingModule
  ],
  declarations: [EjerciciosModificarPage]
})
export class EjerciciosModificarPageModule {}
