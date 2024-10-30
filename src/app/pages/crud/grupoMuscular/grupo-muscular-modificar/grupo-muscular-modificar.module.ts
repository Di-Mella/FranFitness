import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoMuscularModificarPageRoutingModule } from './grupo-muscular-modificar-routing.module';

import { GrupoMuscularModificarPage } from './grupo-muscular-modificar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoMuscularModificarPageRoutingModule
  ],
  declarations: [GrupoMuscularModificarPage]
})
export class GrupoMuscularModificarPageModule {}
