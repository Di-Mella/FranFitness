import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanesMembresiaModificarPageRoutingModule } from './planes-membresia-modificar-routing.module';

import { PlanesMembresiaModificarPage } from './planes-membresia-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanesMembresiaModificarPageRoutingModule
  ],
  declarations: [PlanesMembresiaModificarPage]
})
export class PlanesMembresiaModificarPageModule {}
