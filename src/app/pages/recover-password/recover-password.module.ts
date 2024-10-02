import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverPasswordPageRoutingModule } from './recover-password-routing.module';

import { RecoverPasswordPage } from './recover-password.page';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverPasswordPageRoutingModule
  ],
  declarations: [RecoverPasswordPage,ForgotPasswordComponent]
})
export class RecoverPasswordPageModule {}
