import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EjerciciosListarPageRoutingModule } from './ejercicios-listar-routing.module';

import { EjerciciosListarPage } from './ejercicios-listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EjerciciosListarPageRoutingModule
  ],
  declarations: [EjerciciosListarPage]
})
export class EjerciciosListarPageModule {}
