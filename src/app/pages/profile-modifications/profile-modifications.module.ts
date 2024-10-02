import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileModificationsPageRoutingModule } from './profile-modifications-routing.module';

import { ProfileModificationsPage } from './profile-modifications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileModificationsPageRoutingModule
  ],
  declarations: [ProfileModificationsPage]
})
export class ProfileModificationsPageModule {}
