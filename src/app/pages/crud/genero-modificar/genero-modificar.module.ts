import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneroModificarPageRoutingModule } from './genero-modificar-routing.module';

import { GeneroModificarPage } from './genero-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneroModificarPageRoutingModule
  ],
  declarations: [GeneroModificarPage]
})
export class GeneroModificarPageModule {}
