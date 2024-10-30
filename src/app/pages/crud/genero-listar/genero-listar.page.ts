import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Generos } from 'src/app/class/generos';
import { ServiceBDService } from 'src/app/services/service-bd.service';


@Component({
  selector: 'app-genero-listar',
  templateUrl: './genero-listar.page.html',
  styleUrls: ['./genero-listar.page.scss'], 
})
export class GeneroListarPage implements OnInit {
  generos: Generos[] = [];

  constructor(private db: ServiceBDService, private router: Router) {
    this.db.getGeneros();
    this.db.fetchGenero().subscribe(data=>{
      //this.db.presentAlert("aaa",data+"");
      this.generos = data;
    })
  }
  ngOnInit() {
    //this.db.getGeneros();
    this.db.fetchGenero().subscribe(data=>{
      this.generos = data;
    })
  }

  eliminarGenero(id_genero: number) {
    this.db.deleteGenero(id_genero).then(() => {
      console.log('Género eliminado');
    });
  }
  editarGenero(id: number) {
    this.router.navigate(['/genero-modificar', id]);
  }
}