// archivo: src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';
import * as bcrypt from 'bcryptjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private database!: SQLiteObject;

  // BehaviorSubjects para manejar el estado de autenticación y roles
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string>('');

  // JWT Helper
  private jwtHelper = new JwtHelperService();

  constructor(
    private alertController: AlertController
  ) {
  }
  /**
   * Registro de un nuevo usuario
   * @param usuario Datos del usuario a registrar
   */
  public async register(usuario: Omit<Usuario, 'id_usuario' | 'fecha_registro'>): Promise<void> {
    try {
      // Validaciones de seguridad de contraseña
      if (!this.validatePassword(usuario.clave)) {
        throw new Error('La contraseña no cumple con los requisitos de seguridad.');
      }

      // Verificar que el email y RUT no existan ya
      const emailExists = await this.checkEmailExists(usuario.email);
      if (emailExists) {
        throw new Error('El email ya está registrado.');
      }

      const rutExists = await this.checkRutExists(usuario.rut);
      if (rutExists) {
        throw new Error('El RUT ya está registrado.');
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(usuario.clave, 10);

      // Fecha de registro actual
      const fechaRegistro = new Date().toISOString();

      // Insertar usuario en la base de datos
      await this.database.executeSql(
        `INSERT INTO usuarios(
          nombre, apellido, email, clave, fecha_nacimiento, telefono, fecha_registro, rut, genero_id_genero, rol_usuarios_id_rol
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          usuario.nombre,
          usuario.apellido,
          usuario.email,
          hashedPassword,
          usuario.fecha_nacimiento,
          usuario.telefono,
          fechaRegistro,
          usuario.rut,
          usuario.genero_id_genero,
          usuario.rol_usuarios_id_rol
        ]
      );

      this.presentAlert('Éxito', 'Usuario registrado exitosamente.');

    } catch (error) {
      console.error('Error en registro', error);
      this.presentAlert('Error','No se pudo registrar 1 el usuario.');
      throw error;
    }
  }

  /**
   * Login de usuario
   * @param email Email del usuario
   * @param clave Contraseña del usuario
   */
  public async login(email: string, clave: string): Promise<void> {
    try {
      // Buscar usuario por email
      const res = await this.database.executeSql('SELECT * FROM usuarios WHERE email = ?', [email]);

      if (res.rows.length === 0) {
        throw new Error('Email o contraseña incorrectos.');
      }

      const usuario: Usuario = res.rows.item(0);

      // Comparar contraseñas
      const passwordMatch = await bcrypt.compare(clave, usuario.clave);

      if (!passwordMatch) {
        throw new Error('Email o contraseña incorrectos.');
      }

      // Obtener rol del usuario
      const rol = await this.getRolById(usuario.rol_usuarios_id_rol);

      // Generar Token (Simulado)
      const token = this.generateToken(usuario, rol.nombre);

      // Almacenar Token en el almacenamiento local (LocalStorage)
      localStorage.setItem('token', token);

      // Actualizar BehaviorSubjects
      this.isAuthenticated.next(true);
      this.userRole.next(rol.nombre);

      this.presentAlert('Éxito', 'Inicio de sesión exitoso.');

    } catch (error) {
      console.error('Error en login', error);
      this.presentAlert('Error', 'No se pudo iniciar sesión.');
      throw error;
    }
  }

  /**
   * Generar un token simulado (en una aplicación real, esto debe hacerse en el backend)
   * @param usuario Datos del usuario
   * @param rol Nombre del rol
   */
  private generateToken(usuario: Usuario, rol: string): string {
    const payload = {
      id: usuario.id_usuario,
      email: usuario.email,
      rol: rol,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expira en 1 hora
    };
    return btoa(JSON.stringify(payload)); // Token codificado en Base64
  }

  /**
   * Obtener rol por ID
   * @param id_rol ID del rol
   */
  private async getRolById(id_rol: number): Promise<Rol> {
    const res = await this.database.executeSql('SELECT * FROM roles WHERE id_rol = ?', [id_rol]);

    if (res.rows.length === 0) {
      throw new Error('Rol no encontrado.');
    }

    return res.rows.item(0);
  }

  /**
   * Verificar si un email ya está registrado
   * @param email Email a verificar
   */
  private async checkEmailExists(email: string): Promise<boolean> {
    const res = await this.database.executeSql('SELECT * FROM usuarios WHERE email = ?', [email]);
    return res.rows.length > 0;
  }

  /**
   * Verificar si un RUT ya está registrado
   * @param rut RUT a verificar
   */
  private async checkRutExists(rut: string): Promise<boolean> {
    const res = await this.database.executeSql('SELECT * FROM usuarios WHERE rut = ?', [rut]);
    return res.rows.length > 0;
  }

  /**
   * Validar fortaleza de la contraseña
   * @param password Contraseña a validar
   */
  private validatePassword(password: string): boolean {
    // Longitud mínima
    if (password.length < 8) {
      return false;
    }

    // Debe contener al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Debe contener al menos una letra minúscula
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Debe contener al menos un número
    if (!/[0-9]/.test(password)) {
      return false;
    }

    // Debe contener al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return false;
    }

    return true;
  }

  /**
   * Verificar si el usuario está autenticado
   */
  public isUserAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  /**
   * Obtener el rol del usuario
   */
  public getUserRole(): Observable<string> {
    return this.userRole.asObservable();
  }

  /**
   * Cerrar sesión del usuario
   */
  public logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.userRole.next('');
    this.presentAlert('Éxito', 'Cierre de sesión exitoso.');
  }

  /**
   * Presentar una alerta al usuario
   * @param titulo Título de la alerta
   * @param mensaje Mensaje de la alerta
   */
  private async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  /**
   * Obtener el usuario actual a partir del token
   */
  public getCurrentUser(): Usuario | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token));
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        // Token expirado
        this.logout();
        return null;
      }
      // Deberías almacenar más datos en el token según tus necesidades
      return {
        id_usuario: payload.id,
        email: payload.email,
        // Completa con otros campos si es necesario
        nombre: '',
        apellido: '',
        clave: '',
        fecha_nacimiento: '',
        telefono: '',
        fecha_registro: '',
        rut: '',
        genero_id_genero: 0,
        rol_usuarios_id_rol: 0
      };
    } catch (error) {
      console.error('Error decodificando el token', error);
      return null;
    }
  }
}
