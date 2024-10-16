import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EvaluacionComponent } from 'src/app/components/evaluacion/evaluacion.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage{
  constructor(private modalController: ModalController) {}
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
  ngOnInit() {
  }
  async abrirEvaluacion() {
    console.log('Método abrirEvaluacion llamado'); // Asegúrate de que esto se imprima en la consola
    const modal = await this.modalController.create({
      component: EvaluacionComponent, // Asegúrate de que este componente existe y está correctamente importado
    });
    await modal.present();
  }
  cerrarModal() {
    this.modalController.dismiss();
  }
}
