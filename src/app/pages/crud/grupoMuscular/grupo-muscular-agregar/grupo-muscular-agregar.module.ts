import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoMuscularAgregarPageRoutingModule } from './grupo-muscular-agregar-routing.module';

import { GrupoMuscularAgregarPage } from './grupo-muscular-agregar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoMuscularAgregarPageRoutingModule
  ],
  declarations: [GrupoMuscularAgregarPage]
})
export class GrupoMuscularAgregarPageModule {}
