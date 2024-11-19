import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Generos } from 'src/app/class/generos';
import { Usuarios } from 'src/app/class/usuarios';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

   
  registerForm: FormGroup;
  generos: Generos[] = [];

  constructor(private formBuilder: FormBuilder, private db: ServiceBDService) {
    this.db.getGeneros();
    this.db.fetchGenero().subscribe(data=>{
      //this.db.presentAlert("aaa",data+"");
      this.generos = data;
    })
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      rut: ['', Validators.required],
      genero_id_genero: ['', Validators.required],
      rol_usuarios_id_rol: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.db.fetchGenero().subscribe(data=>{
      this.generos = data;
    })
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const usuario: Usuarios = {
        ...this.registerForm.value,// Asegúrate de añadir esta propiedad a tu modelo
      };
      this.db.addUsuario(usuario).then(() => {
        // Aquí puedes manejar lo que ocurre después de registrar al usuario, como redirigir o mostrar un mensaje
        console.log('Usuario registrado exitosamente');
      }).catch(error => {
        console.error('Error al registrar usuario:', error);
      });
    }
  }
  
  
}