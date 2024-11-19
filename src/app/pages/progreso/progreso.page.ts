import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.page.html',
  styleUrls: ['./progreso.page.scss'],
})
export class ProgresoPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  goToCamera() {
    this.navCtrl.navigateForward('/camara');
  }
  ngOnInit() {
  }

}
