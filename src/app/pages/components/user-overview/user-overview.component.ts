// src/app/components/user-overview/user-overview.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
})
export class UserOverviewComponent implements OnInit {

  user = {
    name: 'Juan Pérez',
    progress: 75, // Porcentaje de progreso
    lastActivity: 'Entrenamiento de fuerza - 2 horas'
  };

  constructor() { }

  ngOnInit() {}

}
