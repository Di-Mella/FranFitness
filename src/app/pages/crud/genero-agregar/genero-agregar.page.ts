import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-genero-agregar',
  templateUrl: './genero-agregar.page.html',
  styleUrls: ['./genero-agregar.page.scss'],
})
export class GeneroAgregarPage {

  tipo_genero: string = '';

  constructor(private db: ServiceBDService, private router: Router) {}

  agregarGenero() {
    this.db.addGenero(this.tipo_genero).then(() => {
      console.log('Género agregado');
      this.router.navigate(['/genero-listar']);
    });
  }

}
