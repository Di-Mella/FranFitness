import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Genero } from '../class/genero';
import { RolUsuarios } from '../class/rol-usuarios';
import { Ejercicios } from '../class/ejercicios';
import { GrupoMuscular } from '../class/grupo-muscular';
import { HistorialRutinas } from '../class/historial-rutinas';
import { PlanesMembresia } from '../class/planes-membresia';
import { Progreso } from '../class/progreso';
import { RutinaEjercicios } from '../class/rutina-ejercicios';
import { Rutinas } from '../class/rutinas';
import { Subscripcion } from '../class/subscripcion';
import { Usuarios } from '../class/usuarios';
@Injectable({
  providedIn: 'root'
})
export class ServiceBDService {
  //Variable de conexion a la BD
  public database!:  SQLiteObject;

  // variable de las tablas
  // Tabla genero
  tablaGenero: string = "CREATE TABLE IF NOT EXISTS genero (id_genero INTEGER PRIMARY KEY, tipo_genero TEXT NOT NULL);";
  // Tabla rol_usuarios
  tablaRolUsuarios: string = "CREATE TABLE IF NOT EXISTS rol_usuarios (id_rol INTEGER PRIMARY KEY, nombrerol TEXT NOT NULL);";
  // Tabla grupo_muscular
  tablaGrupoMuscular: string = "CREATE TABLE IF NOT EXISTS grupo_muscular (id_grupo_muscular INTEGER PRIMARY KEY, nombre_grupomuscular TEXT NOT NULL);";
  // Tabla ejercicios
  tablaEjercicios: string = "CREATE TABLE IF NOT EXISTS ejercicios (id_ejercicios INTEGER PRIMARY KEY, nombre TEXT NOT NULL, descripcion TEXT NOT NULL, grupo_muscular_id_grupo_muscular INTEGER NOT NULL, FOREIGN KEY (grupo_muscular_id_grupo_muscular) REFERENCES grupo_muscular(id_grupo_muscular));";
  // Tabla rutinas
  tablaRutinas: string = "CREATE TABLE IF NOT EXISTS rutinas (id_rutina INTEGER PRIMARY KEY, nombre TEXT NOT NULL, descripcion TEXT NOT NULL, nivel_dificultad TEXT NOT NULL, duracion_minutos INTEGER NOT NULL);";
  // Tabla usuarios
  tablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuarios (id_usuario INTEGER PRIMARY KEY, nombre TEXT NOT NULL, apellido TEXT NOT NULL, email TEXT NOT NULL UNIQUE, clave TEXT NOT NULL, fecha_nacimiento TEXT NOT NULL, telefono TEXT NOT NULL, fecha_registro TEXT NOT NULL, rut TEXT NOT NULL UNIQUE, genero_id_genero INTEGER NOT NULL, rol_usuarios_id_rol INTEGER NOT NULL, FOREIGN KEY (genero_id_genero) REFERENCES genero(id_genero), FOREIGN KEY (rol_usuarios_id_rol) REFERENCES rol_usuarios(id_rol));";
  // Tabla planes_membresia
  tablaPlanesMembresia: string = "CREATE TABLE IF NOT EXISTS planes_membresia (id_plan INTEGER PRIMARY KEY, nombre_plan TEXT NOT NULL, descripcion TEXT NOT NULL, precio REAL NOT NULL, duracion_dias INTEGER NOT NULL);";
  // Tabla historial_rutinas
  tablaHistorialRutinas: string = "CREATE TABLE IF NOT EXISTS historial_rutinas (id_historial INTEGER PRIMARY KEY AUTOINCREMENT, fecha_realizacion TEXT NOT NULL, duracion_real TEXT NOT NULL, usuarios_id_usuario INTEGER NOT NULL, rutinas_id_rutina INTEGER NOT NULL, FOREIGN KEY (usuarios_id_usuario) REFERENCES usuarios(id_usuario), FOREIGN KEY (rutinas_id_rutina) REFERENCES rutinas(id_rutina));";
  // Tabla subscripcion
  tablaSubscripcion: string = "CREATE TABLE IF NOT EXISTS subscripcion (id_pago INTEGER PRIMARY KEY AUTOINCREMENT, monto REAL NOT NULL, fechapago TEXT NOT NULL, metodo_pago TEXT NOT NULL, usuarios_id_usuario INTEGER NOT NULL, planes_membresia_id_plan INTEGER NOT NULL, estado_sub TEXT NOT NULL, FOREIGN KEY (usuarios_id_usuario) REFERENCES usuarios(id_usuario), FOREIGN KEY (planes_membresia_id_plan) REFERENCES planes_membresia(id_plan));";
  // Tabla progreso
  tablaProgreso: string = "CREATE TABLE IF NOT EXISTS progreso (id_progreso INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT NOT NULL, peso REAL NOT NULL, porcentaje_grasa REAL NOT NULL, masa_muscular REAL NOT NULL, usuarios_id_usuario INTEGER NOT NULL, FOREIGN KEY (usuarios_id_usuario) REFERENCES usuarios(id_usuario));";
  // Tabla rutina_ejercicios
  tablaRutinaEjercicios: string = "CREATE TABLE IF NOT EXISTS rutina_ejercicios (id INTEGER PRIMARY KEY AUTOINCREMENT, series INTEGER NOT NULL, repeticiones INTEGER NOT NULL, rutinas_id_rutina INTEGER NOT NULL, ejercicios_id_ejercicios INTEGER NOT NULL, tipo_rutina TEXT NOT NULL, FOREIGN KEY (rutinas_id_rutina) REFERENCES rutinas(id_rutina), FOREIGN KEY (ejercicios_id_ejercicios) REFERENCES ejercicios(id_ejercicios));";
  
  // Variables para para realizar insert por defecto 

  //variable de observables para las consultas de base de datos
  listaGenero = new BehaviorSubject([]);
  listaRolUsuarios = new BehaviorSubject([]);
  listaGrupoMuscular = new BehaviorSubject([]);
  listaEjercicios = new BehaviorSubject([]);
  listaRutinas = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);
  listaPlanesMembresia = new BehaviorSubject([]);
  listaHistorialRutinas = new BehaviorSubject([]);
  listaSubscripcion = new BehaviorSubject([]);
  listaProgreso = new BehaviorSubject([]);
  listaRutinaEjercicios = new BehaviorSubject([]);
  


  //variable observable para el estado de la base de datos -- ES UNICA
  private isDBready: BehaviorSubject <boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController) { this.crearBD() }

  crearBD(){
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'franfitness.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      })
      .catch(e => {
        this.presentAlert('Crear BD', 'Error: ' + JSON.stringify(e));
      });
    });
  }

  async crearTablas(){
    try{
      await this.database.executeSql(this.tablaGenero,[]);
      await this.database.executeSql(this.tablaRolUsuarios,[]);
      await this.database.executeSql(this.tablaGrupoMuscular,[]);
      await this.database.executeSql(this.tablaEjercicios,[]);
      await this.database.executeSql(this.tablaRutinas,[]);
      await this.database.executeSql(this.tablaUsuarios,[]);
      await this.database.executeSql(this.tablaPlanesMembresia,[]);
      await this.database.executeSql(this.tablaHistorialRutinas,[]);
      await this.database.executeSql(this.tablaSubscripcion,[]);
      await this.database.executeSql(this.tablaProgreso,[]);
      await this.database.executeSql(this.tablaRutinaEjercicios,[]);
      // falta agregar registros de insert por defecto


    }catch(e){
      this.presentAlert('Crear tablas', 'Error' + JSON.stringify(e));
    }

  }

  // Método fetch para la tabla genero
  fetchGenero(): Observable<Genero[]>{
    return this.listaGenero.asObservable();
  }

  // Método fetch para la tabla rol_usuarios
  fetchRolUsuarios(): Observable<RolUsuarios[]> {
    return this.listaRolUsuarios.asObservable();
  }

  // Método fetch para la tabla grupo_muscular
  fetchGrupoMuscular(): Observable<GrupoMuscular[]> {
    return this.listaGrupoMuscular.asObservable();
  }

  // Método fetch para la tabla ejercicios
  fetchEjercicios(): Observable<Ejercicios[]> {
    return this.listaEjercicios.asObservable();
  }

  // Método fetch para la tabla rutinas
  fetchRutinas(): Observable<Rutinas[]> {
    return this.listaRutinas.asObservable();
  }

  // Método fetch para la tabla usuarios
  fetchUsuarios(): Observable<Usuarios[]> {
    return this.listaUsuarios.asObservable();
  }

  // Método fetch para la tabla planes_membresia
  fetchPlanesMembresia(): Observable<PlanesMembresia[]> {
    return this.listaPlanesMembresia.asObservable();
  }

  // Método fetch para la tabla historial_rutinas
  fetchHistorialRutinas(): Observable<HistorialRutinas[]> {
    return this.listaHistorialRutinas.asObservable();
  }

  // Método fetch para la tabla subscripcion
  fetchSubscripcion(): Observable<Subscripcion[]> {
    return this.listaSubscripcion.asObservable();
  }

  // Método fetch para la tabla progreso
  fetchProgreso(): Observable<Progreso[]> {
    return this.listaProgreso.asObservable();
  }

  // Método fetch para la tabla rutina_ejercicios
  fetchRutinaEjercicios(): Observable<RutinaEjercicios[]> {
    return this.listaRutinaEjercicios.asObservable();
  }
  
  dbState(){
    return this.isDBready.asObservable();
  }
  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
