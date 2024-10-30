import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public actionSheetButtons = [
    {
      text: 'Iniciar Sesión',
      data: {
        action: 'login',
      },
      handler: () => {
        this.router.navigate(['/login']);
      },
    },
    {
      text: 'Registrarse',
      data: {
        action: 'register',
      },
      handler: () => {
        this.router.navigate(['/registro']);
      },
    },
    {
      text: 'Recuperar Contraseña',
      data: {
        action: 'recover-password',
      },
      handler: () => {
        this.router.navigate(['/recover-password']);
      },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
      handler: () => {
        console.log('Cancel clicked');
      },
    },
  ];

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router 
  ) {}

  // Método para abrir el Action Sheet
  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'FranFitness',
      buttons: this.actionSheetButtons,
    });
    await actionSheet.present();
  }
  ngOnInit() {
  }

}
