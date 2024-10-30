import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuario: Usuario | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadUsuario();
  }

  /**
   * Cargar los datos del usuario actual
   */
  async loadUsuario() {
    this.usuario = this.authService.getCurrentUser();
    // Puedes completar los campos restantes según tus necesidades
  }

  /**
   * Cerrar sesión
   */
  logout() {
    this.authService.logout();
  }
}
