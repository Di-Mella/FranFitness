import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneroAgregarPageRoutingModule } from './genero-agregar-routing.module';

import { GeneroAgregarPage } from './genero-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneroAgregarPageRoutingModule
  ],
  declarations: [GeneroAgregarPage]
})
export class GeneroAgregarPageModule {}
