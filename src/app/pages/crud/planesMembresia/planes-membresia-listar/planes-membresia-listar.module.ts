import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanesMembresiaListarPageRoutingModule } from './planes-membresia-listar-routing.module';

import { PlanesMembresiaListarPage } from './planes-membresia-listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanesMembresiaListarPageRoutingModule
  ],
  declarations: [PlanesMembresiaListarPage]
})
export class PlanesMembresiaListarPageModule {}
