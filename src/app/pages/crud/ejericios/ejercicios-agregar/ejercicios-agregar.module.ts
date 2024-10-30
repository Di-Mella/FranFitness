import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjerciciosAgregarPageRoutingModule } from './ejercicios-agregar-routing.module';

import { EjerciciosAgregarPage } from './ejercicios-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EjerciciosAgregarPageRoutingModule
  ],
  declarations: [EjerciciosAgregarPage]
})
export class EjerciciosAgregarPageModule {}
