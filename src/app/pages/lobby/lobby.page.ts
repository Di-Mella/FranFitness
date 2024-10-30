import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.page.html',
  styleUrls: ['./lobby.page.scss'],
})

export class LobbyPage implements OnInit {
  constructor(private navCtrl: NavController ) { }
  progress: number = 0.1;
  updateProgress(value: number) {
  this.progress = value / 100; // Convierte el valor de 0 a 100 a un valor de 0 a 1
}
  usuarios = [
    {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      nombre: 'María López',
      email: 'maria.lopez@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
  ];
  user = {
    name: 'Diego',
    progress: 75, // Porcentaje de progreso
    lastActivity: 'Entrenamiento de fuerza - 2 horas'
  };
  name: string ='Diego';
  ngOnInit() {
  }

  async ingresar() {  
    this.navCtrl.navigateRoot('/entrenamientos')
}
async ingresar2() {  
  this.navCtrl.navigateRoot('/ejercicios-listar')
}async ingresar3() {  
  this.navCtrl.navigateRoot('/genero-listar')
}
}
