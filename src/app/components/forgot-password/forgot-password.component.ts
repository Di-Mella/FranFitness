// src/app/components/forgot-password/forgot-password.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {

  email: string ="";

  constructor() { }

  onSubmit() {
    console.log('Correo de recuperación enviado a:', this.email);
    
  }
}
