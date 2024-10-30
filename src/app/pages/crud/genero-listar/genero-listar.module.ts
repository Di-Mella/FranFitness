import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneroListarPageRoutingModule } from './genero-listar-routing.module';

import { GeneroListarPage } from './genero-listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneroListarPageRoutingModule
  ],
  declarations: [GeneroListarPage]
})
export class GeneroListarPageModule {}
