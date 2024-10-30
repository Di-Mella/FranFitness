import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
})
export class RutinasPage implements OnInit {


  constructor(private router: Router) { }
  user = {
    name: 'Diego',
    progress: 75, // Porcentaje de progreso
    lastActivity: 'Entrenamiento de fuerza - 2 horas'
  };
  ngOnInit() {
  }

   // Representa el progreso de 0 a 1
  stars = new Array(5);
}
