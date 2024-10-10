import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-change-password2',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {

  currentPassword: string ="";
  newPassword: string ="";
  confirmPassword: string ="";

  constructor(private alertController: AlertController) { }

  async onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      await this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }
    await this.presentAlert('Éxito', 'Contraseña cambiada correctamente');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
