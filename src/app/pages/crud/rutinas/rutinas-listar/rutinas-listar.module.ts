import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutinasListarPageRoutingModule } from './rutinas-listar-routing.module';

import { RutinasListarPage } from './rutinas-listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutinasListarPageRoutingModule
  ],
  declarations: [RutinasListarPage]
})
export class RutinasListarPageModule {}
