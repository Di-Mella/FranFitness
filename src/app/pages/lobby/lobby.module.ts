import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LobbyPageRoutingModule } from './lobby-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LobbyPage } from './lobby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LobbyPageRoutingModule,
    SharedModule
  ],
  declarations: [LobbyPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LobbyPageModule {}
