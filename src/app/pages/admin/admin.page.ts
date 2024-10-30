import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  /**
   * Cargar todos los usuarios para administrarlos
   */
  async loadUsuarios() {
    try {
      // Implementar método para obtener todos los usuarios desde el servicio
      // this.usuarios = await this.authService.getAllUsuarios();
    } catch (error) {
      console.error('Error cargando usuarios', error);
    }
  }

  /**
   * Cerrar sesión
   */
  logout() {
    this.authService.logout();
  }
}
