import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuerzaPageRoutingModule } from './fuerza-routing.module';

import { FuerzaPage } from './fuerza.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuerzaPageRoutingModule
  ],
  declarations: [FuerzaPage]
})
export class FuerzaPageModule {}
