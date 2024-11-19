import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicios } from 'src/app/class/ejercicios';
import { ServiceBDService } from 'src/app/services/service-bd.service';


@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.page.html',
  styleUrls: ['./entrenamientos.page.scss'],
})
export class EntrenamientosPage implements OnInit {
  ejercicios: Ejercicios[]= [];

  constructor(private db: ServiceBDService, private router: Router) {
    this.db.getEjercicios();
    this.db.fetchEjercicios().subscribe(data=>{
      this.ejercicios = data;
    })
   }

  ngOnInit() {
    this.db.getEjercicios();
    this.db.fetchEjercicios().subscribe(data=>{
      this.ejercicios = data;
    })
  }

}
