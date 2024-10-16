import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FuerzaComponent } from 'src/app/components/fuerza/fuerza.component';
import { CardioComponent } from 'src/app/components/cardio/cardio.component';
import { FlexibilidadComponent } from 'src/app/components/flexibilidad/flexibilidad.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


