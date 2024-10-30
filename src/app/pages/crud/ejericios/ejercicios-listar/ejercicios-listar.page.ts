import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ejercicios } from 'src/app/class/ejercicios';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-ejercicios-listar',
  templateUrl: './ejercicios-listar.page.html',
  styleUrls: ['./ejercicios-listar.page.scss'],
})
export class EjerciciosListarPage implements OnInit {
  ejercicios: Ejercicios[] = [];

  constructor(private db: ServiceBDService, private router: Router) {
    this.db.getEjercicios();
    this.db.fetchEjercicios().subscribe(data=>{
      //this.db.presentAlert("aaa",data+"");
      this.ejercicios = data;
    })
  }
  ngOnInit() {
    //this.db.getGeneros();
    this.db.fetchEjercicios().subscribe(data=>{
      this.ejercicios = data;
    })
  }

  eliminarGenero(id_ejecicio: number) {
    this.db.deleteEjercicio(id_ejecicio).then(() => {
      console.log('Ejercicio eliminado');
    });
  }
  editarGenero(id: number) {
    this.router.navigate(['/ejercicios-modificar', id]);
  }
}
