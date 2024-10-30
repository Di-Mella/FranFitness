import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  constructor(private navCrtl: NavController) {}
   
  ngOnInit() {
  }
  registerUser(){
    if (this.user.password !== this.user.confirmPassword){
      alert('Las contraseñas no coinciden');
      return;
    }
  }
  
  
}