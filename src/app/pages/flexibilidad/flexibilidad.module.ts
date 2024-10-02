import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlexibilidadPageRoutingModule } from './flexibilidad-routing.module';

import { FlexibilidadPage } from './flexibilidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexibilidadPageRoutingModule
  ],
  declarations: [FlexibilidadPage]
})
export class FlexibilidadPageModule {}
