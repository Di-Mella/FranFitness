import { Component, OnInit } from '@angular/core';
import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms'
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;


  constructor(public fb: FormBuilder, private router: Router,public alertController : AlertController, private navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl ("", Validators.required),
      'password': new FormControl ("", Validators.required)
    })
   }

  ngOnInit() {
  }


  async ingresar() {
    var f = this.formularioLogin.value;
    // imprimir los valores del formulario
    console.log('Formulario - Nombre:', f.nombre);
    console.log('Formulario - Password:', f.password)

    localStorage.setItem('nombre', f.nombre);  // Guardar nombre
    localStorage.setItem('password', f.password); 

    var storedUsuario = localStorage.getItem('nombre');
    var storedPassword = localStorage.getItem('password');
    //imprimir los valores almacenados en localStorage
    console.log('Stored Usuario:', storedUsuario);
    console.log('Stored Password:', storedPassword);

    if (storedUsuario == f.nombre && storedPassword == f.password) {
        console.log('Ingresado');
      this.navCtrl.navigateRoot('/dashboard')


    } else {
        const alert = await this.alertController.create({
            message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
            buttons: ['Aceptar']
        });
        await alert.present();
    }
}
}
