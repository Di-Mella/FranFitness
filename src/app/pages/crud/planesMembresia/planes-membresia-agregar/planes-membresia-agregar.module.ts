import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanesMembresiaAgregarPageRoutingModule } from './planes-membresia-agregar-routing.module';

import { PlanesMembresiaAgregarPage } from './planes-membresia-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanesMembresiaAgregarPageRoutingModule
  ],
  declarations: [PlanesMembresiaAgregarPage]
})
export class PlanesMembresiaAgregarPageModule {}
