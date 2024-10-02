import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user = {
    name: 'Juan Pérez',
    progress: 75, // Porcentaje de progreso
    lastActivity: 'Entrenamiento de fuerza - 2 horas'
  };
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
