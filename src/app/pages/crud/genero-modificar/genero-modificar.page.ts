import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-genero-modificar',
  templateUrl: './genero-modificar.page.html',
  styleUrls: ['./genero-modificar.page.scss'],
})
export class GeneroModificarPage implements OnInit {
  id_genero!: number;
  tipo_genero: string = '';

  constructor(
    private db: ServiceBDService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID del género desde la URL
    this.cargarGenero();
  }

  async cargarGenero() {
    // Obtener la lista de géneros y buscar el género específico por su ID
    const generos = await this.db.getGeneros();
    /*
    const genero = generos.find(g => g.id_genero === this.id_genero);
    if (genero) {
      this.tipo_genero = genero.tipo_genero;
    }*/
  }

  modificarGenero() {
    this.db.updateGenero(this.id_genero, this.tipo_genero).then(() => {
      console.log('Género modificado');
      this.router.navigate(['/genero-listar']);
    });
  }
}