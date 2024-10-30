import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoMuscularListarPageRoutingModule } from './grupo-muscular-listar-routing.module';

import { GrupoMuscularListarPage } from './grupo-muscular-listar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoMuscularListarPageRoutingModule
  ],
  declarations: [GrupoMuscularListarPage]
})
export class GrupoMuscularListarPageModule {}
