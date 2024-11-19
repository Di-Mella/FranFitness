import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProgresoPageRoutingModule } from './progreso-routing.module';
import { ProgresoPage } from './progreso.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgresoPageRoutingModule,
    SharedModule
  ],
  declarations: [ProgresoPage],
})
export class ProgresoPageModule {}
