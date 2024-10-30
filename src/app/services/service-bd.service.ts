import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject,Observable } from 'rxjs';
import { Generos } from '../class/generos';
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
  registrogenero1: string = "INSERT or IGNORE INTO genero(id_genero, tipo_genero) VALUES(1,'Masculino')";
  registrogenero2: string = "INSERT or IGNORE INTO genero(id_genero, tipo_genero) VALUES(2,'Femenino')";
  registrogenero3: string = "INSERT or IGNORE INTO genero(id_genero, tipo_genero) VALUES(3,'Otro')";
  //Rol
  registroRol1: string = "INSERT or IGNORE INTO rol_usuarios(id_rol, nombrerol) VALUES(1, 'Administrador');";
  registroRol2: string  = "INSERT or IGNORE INTO rol_usuarios(id_rol, nombrerol) VALUES(2, 'Usuario');";
  //Grupo
  registroGrupo1: string  = "INSERT or IGNORE INTO grupo_muscular(id_grupo_muscular, nombre_grupomuscular) VALUES(1, 'Pecho');";
  registroGrupo2: string  = "INSERT or IGNORE INTO grupo_muscular(id_grupo_muscular, nombre_grupomuscular) VALUES(2, 'Espalda');";
  registroGrupo3: string  = "INSERT or IGNORE INTO grupo_muscular(id_grupo_muscular, nombre_grupomuscular) VALUES(3, 'Pierna');";
  registroGrupo4: string  = "INSERT or IGNORE INTO grupo_muscular(id_grupo_muscular, nombre_grupomuscular) VALUES(4, 'Abdomen');";
  registroGrupo5: string  = "INSERT or IGNORE INTO grupo_muscular(id_grupo_muscular, nombre_grupomuscular) VALUES(5, 'Brazos');";
  //Ejercicio
  registroEjercicio1: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(1, 'Press de banca', 'Ejercicio para trabajar el pecho', 1);";
  registroEjercicio2: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(2, 'Aperturas con mancuernas', 'Ejercicio para abrir y fortalecer los músculos del pecho', 1);";
  registroEjercicio3: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(3, 'Press inclinado', 'Ejercicio para trabajar la parte superior del pecho', 1);";
  registroEjercicio4: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(4, 'Remo con barra', 'Ejercicio para fortalecer la espalda', 2);";
  registroEjercicio5: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(5, 'Dominadas', 'Ejercicio para trabajar toda la espalda', 2);";
  registroEjercicio6: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(6, 'Pulldown con polea', 'Ejercicio para trabajar los dorsales', 2);";
  registroEjercicio7: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(7, 'Sentadillas', 'Ejercicio para fortalecer los cuádriceps', 3);";
  registroEjercicio8: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(8, 'Prensa de piernas', 'Ejercicio para trabajar los cuádriceps y glúteos', 3);";
  registroEjercicio9: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(9, 'Curl de piernas', 'Ejercicio para trabajar los isquiotibiales', 3);";
  registroEjercicio10: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(10, 'Peso muerto', 'Ejercicio que involucra principalmente los isquiotibiales y glúteos', 3);";
  registroEjercicio11: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(11, 'Elevación de talones', 'Ejercicio para fortalecer los gemelos', 3);";
  registroEjercicio12: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(12, 'Elevación de talones en máquina', 'Ejercicio para trabajar los gemelos en profundidad', 3);";
  registroEjercicio13: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(13, 'Puente de glúteos', 'Ejercicio para trabajar los glúteos', 3);";
  registroEjercicio14: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(14, 'Patada trasera en máquina', 'Ejercicio para fortalecer los glúteos', 3);";
  registroEjercicio15: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(15, 'Crunch', 'Ejercicio básico para trabajar el abdomen', 4);";
  registroEjercicio16: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(16, 'Elevación de piernas', 'Ejercicio para fortalecer el abdomen inferior', 4);";
  registroEjercicio17: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(17, 'Russian Twist', 'Ejercicio para trabajar los oblicuos', 4);";
  registroEjercicio18: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(18, 'Plancha lateral', 'Ejercicio para fortalecer los oblicuos y el core', 4);";
  registroEjercicio19: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(19, 'Hiperextensiones', 'Ejercicio para trabajar la zona lumbar', 4);";
  registroEjercicio20: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(20, 'Superman', 'Ejercicio para fortalecer la zona lumbar', 4);";
  registroEjercicio21: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(21, 'Curl de bíceps con barra', 'Ejercicio para trabajar los bíceps', 5);";
  registroEjercicio22: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(22, 'Curl de martillo', 'Ejercicio para trabajar el braquial y bíceps', 5);";
  registroEjercicio23: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(23, 'Curl concentrado', 'Ejercicio para aislar los bíceps', 5);";
  registroEjercicio24: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(24, 'Extensión de tríceps en polea', 'Ejercicio para trabajar los tríceps', 5);";
  registroEjercicio25: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(25, 'Press francés', 'Ejercicio para fortalecer los tríceps', 5);";
  registroEjercicio26: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(26, 'Fondos de tríceps', 'Ejercicio para trabajar los tríceps en paralelo', 5);";
  registroEjercicio27: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(27, 'Press militar', 'Ejercicio para trabajar los hombros', 5);";
  registroEjercicio28: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(28, 'Elevaciones laterales', 'Ejercicio para trabajar los deltoides laterales', 5);";
  registroEjercicio29: string  = "INSERT or IGNORE INTO ejercicios(id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(29, 'Pájaros', 'Ejercicio para trabajar los deltoides posteriores', 5);";
  //Planes
  registroPlan1: string  = "INSERT or IGNORE INTO planes_membresia(id_plan, nombre_plan, descripcion, precio, duracion_dias) VALUES(1, 'Básico', 'Acceso a todas las máquinas y entrenamientos básicos.', 19.99, 30);";
  registroPlan2: string  = "INSERT or IGNORE INTO planes_membresia(id_plan, nombre_plan, descripcion, precio, duracion_dias) VALUES(2, 'Premium', 'Acceso a todas las máquinas, entrenamientos grupales y 2 sesiones de personal trainer.', 49.99, 30);";
  registroPlan3: string  = "INSERT or IGNORE INTO planes_membresia(id_plan, nombre_plan, descripcion, precio, duracion_dias) VALUES(3, 'Avanzado', 'Acceso a todas las máquinas, entrenamientos grupales, sesiones ilimitadas de personal trainer y acceso a área VIP.', 79.99, 30);";
  registroPlan4: string  = "INSERT or IGNORE INTO planes_membresia(id_plan, nombre_plan, descripcion, precio, duracion_dias) VALUES(4, 'Anual Básico', 'Acceso básico durante un año con descuentos especiales.', 199.99, 365);";
  registroPlan5: string  = "INSERT or IGNORE INTO planes_membresia(id_plan, nombre_plan, descripcion, precio, duracion_dias) VALUES(5, 'Anual Premium', 'Acceso premium durante un año con todos los beneficios y descuentos en productos.', 499.99, 365);";

  //variable de observables para las consultas de base de datos
  listaGenero = new BehaviorSubject<Generos[]>([]);
  listaRolUsuarios = new BehaviorSubject<RolUsuarios[]>([]);
  listaGrupoMuscular = new BehaviorSubject<GrupoMuscular[]>([]);
  listaEjercicios = new BehaviorSubject<Ejercicios[]>([]);
  listaRutinas = new BehaviorSubject<Rutinas[]>([]);
  listaUsuarios = new BehaviorSubject<Usuarios[]>([]);
  listaPlanesMembresia = new BehaviorSubject<PlanesMembresia[]>([]);
  listaHistorialRutinas = new BehaviorSubject<HistorialRutinas[]>([]);
  listaSubscripcion = new BehaviorSubject<Subscripcion[]>([]);
  listaProgreso = new BehaviorSubject<Progreso[]>([]);
  listaRutinaEjercicios = new BehaviorSubject<RutinaEjercicios[]>([]);


  //variable observable para el estado de la base de datos -- ES UNICA
  private isDBready: BehaviorSubject <boolean> = new BehaviorSubject(false);

constructor(private sqlite: SQLite,private platform: Platform,private alertController: AlertController) { this.crearBD() }

  async presentAlert(titulo:string, msj:string) {
  const alert = await this.alertController.create({
    header: titulo,
    message: msj,
    buttons: ['OK'],
  });

  await alert.present();
  }
  crearBD(){
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'franfitness3.db',
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
    // Método fetch para la tabla genero
    fetchGenero(): Observable<Generos[]>{
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
      this.isDBready.next(true);
      // Ejecutar todos los registros de forma secuencial
      await this.database.executeSql(this.registrogenero1, []);
      await this.database.executeSql(this.registrogenero2, []);
      await this.database.executeSql(this.registrogenero3, []);
      await this.database.executeSql(this.registroRol1, []);
      await this.database.executeSql(this.registroRol2, []);
      await this.database.executeSql(this.registroGrupo1, []);
      await this.database.executeSql(this.registroGrupo2, []);
      await this.database.executeSql(this.registroGrupo3, []);
      await this.database.executeSql(this.registroGrupo4, []);
      await this.database.executeSql(this.registroGrupo5, []);
      await this.database.executeSql(this.registroEjercicio1, []);
      await this.database.executeSql(this.registroEjercicio2, []);
      await this.database.executeSql(this.registroEjercicio3, []);
      await this.database.executeSql(this.registroEjercicio4, []);
      await this.database.executeSql(this.registroEjercicio5, []);
      await this.database.executeSql(this.registroEjercicio6, []);
      await this.database.executeSql(this.registroEjercicio7, []);
      await this.database.executeSql(this.registroEjercicio8, []);
      await this.database.executeSql(this.registroEjercicio9, []);
      await this.database.executeSql(this.registroEjercicio10, []);
      await this.database.executeSql(this.registroEjercicio11, []);
      await this.database.executeSql(this.registroEjercicio12, []);
      await this.database.executeSql(this.registroEjercicio13, []);
      await this.database.executeSql(this.registroEjercicio14, []);
      await this.database.executeSql(this.registroEjercicio15, []);
      await this.database.executeSql(this.registroEjercicio16, []);
      await this.database.executeSql(this.registroEjercicio17, []);
      await this.database.executeSql(this.registroEjercicio18, []);
      await this.database.executeSql(this.registroEjercicio19, []);
      await this.database.executeSql(this.registroEjercicio20, []);
      await this.database.executeSql(this.registroEjercicio21, []);
      await this.database.executeSql(this.registroEjercicio22, []);
      await this.database.executeSql(this.registroEjercicio23, []);
      await this.database.executeSql(this.registroEjercicio24, []);
      await this.database.executeSql(this.registroEjercicio25, []);
      await this.database.executeSql(this.registroEjercicio26, []);
      await this.database.executeSql(this.registroEjercicio27, []);
      await this.database.executeSql(this.registroEjercicio28, []);
      await this.database.executeSql(this.registroEjercicio29, []);
      await this.database.executeSql(this.registroPlan1, []);
      await this.database.executeSql(this.registroPlan2, []);
      await this.database.executeSql(this.registroPlan3, []);
      await this.database.executeSql(this.registroPlan4, []);
      await this.database.executeSql(this.registroPlan5, []);
      this.getGeneros();
    }catch(e){
      this.presentAlert('Crear tablas', 'Error' + JSON.stringify(e));
    }

  }

  // crud para los metodos
  // Genero
  getGeneros(){
    return this.database.executeSql('SELECT * FROM genero',[]).then((res)=>{
      let generos: Generos[]=[];
      //this.presentAlert("1","entra get:" + res.rows.length);
      if(res.rows.length > 0){
        //this.presentAlert("2","entra for");
        for (var i=0; i < res.rows.length; i++){
          //this.presentAlert("bbb",res.rows.item(i) );
          generos.push(res.rows.item(i));
        }
      }
      this.listaGenero.next(generos as any);
      
    });
  }

  addGenero(tipo_genero: string){
    let data=[tipo_genero];
    return this.database.executeSql('INSERT INTO genero(tipo_genero) VALUES(?)',data)
    .then(()=> {
      this.getGeneros().then(generos =>{
        this.listaGenero.next(generos as any);
      });
    });
  }
  updateGenero(id_genero: number, tipo_genero: string){
    let data= [tipo_genero, id_genero]
    return this.database.executeSql('UPDATE genero SET tipo_genero = ? WHERE id_genero = ?', data)
      .then(() => {

        this.getGeneros().then(generos => {
          this.listaGenero.next(generos as any);
        });
      });
  }
  deleteGenero(id_genero: number){
    return this.database.executeSql('DELETE FROM genero WHERE id_genero = ?',[id_genero])
    .then (()=>{
      this.getGeneros().then(generos => {
        this.listaGenero.next(generos as any);
      });
    });
  }

//Roles
getRoles() {
  return this.database.executeSql('SELECT * FROM rol_usuarios',    []).then((res)=> {
    let roles: Generos[]=[];
    if(res.rows.length > 0){
      for (var i=0; i < res.rows.length; i++){
        roles.push(res.rows.item(i));
      }
    }
  });
}
addRol(nombrerol: string){
  let data = [nombrerol];
  return this.database.executeSql('INSERT INTO rol_usuarios(nombrerol) VALUES(?)', data)
    .then(() => {
      this.getRoles().then(roles => {
        this.listaRolUsuarios.next(roles as any);
      });
    });
}
updateRol(id_rol: number, nombrerol: string): Promise<any> {
  let data = [nombrerol, id_rol];
  return this.database.executeSql('UPDATE rol_usuarios SET nombrerol = ? WHERE id_rol = ?', data)
    .then(() => {
      this.getRoles().then(roles => {
        this.listaRolUsuarios.next(roles as any);
      });
    });
}
deleteRol(id_rol: number) {
  return this.database.executeSql('DELETE FROM rol_usuarios WHERE id_rol = ?', [id_rol])
    .then(() => {
      this.getRoles().then(roles => {
        this.listaRolUsuarios.next(roles as any);
      });
    });
}
// Tabla muscular
getGrupoMuscular(){
  return this.database.executeSql('SELECT * FROM grupo_muscular', []).then((res) => {
    let grupos: GrupoMuscular[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        grupos.push(res.rows.item(i));
      }
    }
    this.listaGrupoMuscular.next(grupos as any);
    
  });
}
addGrupoMuscular(nombre_grupomuscular: string){
  let data = [nombre_grupomuscular];
  return this.database.executeSql('INSERT INTO grupo_muscular(nombre_grupomuscular) VALUES(?)', data)
    .then(() => {
      this.getGrupoMuscular().then(grupos => {
        this.listaGrupoMuscular.next(grupos as any);
      });
    });
}
updateGrupoMuscular(id_grupo_muscular: number, nombre_grupomuscular: string){
  let data = [nombre_grupomuscular, id_grupo_muscular];
  return this.database.executeSql('UPDATE grupo_muscular SET nombre_grupomuscular = ? WHERE id_grupo_muscular = ?', data)
    .then(() => {
      this.getGrupoMuscular().then(grupos => {
        this.listaGrupoMuscular.next(grupos as any);
      });
    });
}
deleteGrupoMuscular(id_grupo_muscular: number){
  return this.database.executeSql('DELETE FROM grupo_muscular WHERE id_grupo_muscular = ?', [id_grupo_muscular])
    .then(() => {
      this.getGrupoMuscular().then(grupos => {
        this.listaGrupoMuscular.next(grupos as any);
      });
    });
}
//Tabla Ejercicios
getEjercicios(){
  return this.database.executeSql('SELECT * FROM ejercicios', []).then((res) => {
    let ejercicios: Ejercicios[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        ejercicios.push(res.rows.item(i));
      }
    }
    this.listaEjercicios.next(ejercicios as any);
    
  });
}
addEjercicio(nombre: string, descripcion: string, grupo_muscular_id_grupo_muscular: number): Promise<any> {
  let data = [nombre, descripcion, grupo_muscular_id_grupo_muscular];
  return this.database.executeSql(
    'INSERT INTO ejercicios(nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES(?, ?, ?)',
    data
  )
  .then(() => {
    this.getEjercicios().then(ejercicios => {
      this.listaEjercicios.next(ejercicios as any);
    });
  });
}
updateEjercicio(id_ejercicios: number, nombre: string, descripcion: string, grupo_muscular_id_grupo_muscular: number): Promise<any> {
  let data = [nombre, descripcion, grupo_muscular_id_grupo_muscular, id_ejercicios];
  return this.database.executeSql(
    'UPDATE ejercicios SET nombre = ?, descripcion = ?, grupo_muscular_id_grupo_muscular = ? WHERE id_ejercicios = ?',
    data
  )
  .then(() => {
    this.getEjercicios().then(ejercicios => {
      this.listaEjercicios.next(ejercicios as any);
    });
  });
}
deleteEjercicio(id_ejercicios: number): Promise<any> {
  return this.database.executeSql('DELETE FROM ejercicios WHERE id_ejercicios = ?', [id_ejercicios])
    .then(() => {
      this.getEjercicios().then(ejercicios => {
        this.listaEjercicios.next(ejercicios as any);
      });
    });
}
// Tabla rutinas
getRutinas(){
  return this.database.executeSql('SELECT * FROM rutinas', []).then((res) => {
    let rutinas: Rutinas[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        rutinas.push(res.rows.item(i));
      }
    }
    this.listaRutinas.next(rutinas as any);
  });
}
addRutina(nombre: string, descripcion: string, nivel_dificultad: string, duracion_minutos: number){
  let data = [nombre, descripcion, nivel_dificultad, duracion_minutos];
  return this.database.executeSql(
    'INSERT INTO rutinas(nombre, descripcion, nivel_dificultad, duracion_minutos) VALUES(?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getRutinas().then(rutinas => {
      this.listaRutinas.next(rutinas as any);
    });
  });
}
updateRutina(id_rutina: number, nombre: string, descripcion: string, nivel_dificultad: string, duracion_minutos: number) {
  let data = [nombre, descripcion, nivel_dificultad, duracion_minutos, id_rutina];
  return this.database.executeSql(
    'UPDATE rutinas SET nombre = ?, descripcion = ?, nivel_dificultad = ?, duracion_minutos = ? WHERE id_rutina = ?',
    data
  )
  .then(() => {
    this.getRutinas().then(rutinas => {
      this.listaRutinas.next(rutinas as any);
    });
  });
}
deleteRutina(id_rutina: number){
  return this.database.executeSql('DELETE FROM rutinas WHERE id_rutina = ?', [id_rutina])
    .then(() => {
      this.getRutinas().then(rutinas => {
        this.listaRutinas.next(rutinas as any);
      });
    });
}

// Tabla Usuarios
getUsuarios(){
  return this.database.executeSql(`
    SELECT usuarios.*, genero.tipo_genero, rol_usuarios.nombrerol
    FROM usuarios
    JOIN genero ON usuarios.genero_id_genero = genero.id_genero
    JOIN rol_usuarios ON usuarios.rol_usuarios_id_rol = rol_usuarios.id_rol
  `, []).then((res) => {
    let usuarios: Usuarios[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        usuarios.push(res.rows.item(i));
      }
    }
    this.listaUsuarios.next(usuarios as any);
    
  });
}
addUsuario(usuario: Usuarios){
  let data = [
    usuario.nombre,
    usuario.apellido,
    usuario.email,
    usuario.clave, // asegurarse de hashear la clave antes de almacenarla
    usuario.fecha_nacimiento,
    usuario.telefono,
    usuario.fecha_registro,
    usuario.rut,
    usuario.genero_id_genero,
    usuario.rol_usuarios_id_rol
  ];
  return this.database.executeSql(`
    INSERT INTO usuarios(
      nombre, apellido, email, clave, fecha_nacimiento, telefono, fecha_registro, rut, genero_id_genero, rol_usuarios_id_rol
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, data)
  .then(() => {
    this.getUsuarios().then(usuarios => {
      this.listaUsuarios.next(usuarios as any);
    });
  });
}
updateUsuario(id_usuario: number, usuario: Usuarios) {
  let data = [
    usuario.nombre,
    usuario.apellido,
    usuario.email,
    usuario.clave, // Asegúrate de hashear la clave antes de almacenarla
    usuario.fecha_nacimiento,
    usuario.telefono,
    usuario.fecha_registro,
    usuario.rut,
    usuario.genero_id_genero,
    usuario.rol_usuarios_id_rol,
    id_usuario
  ];
  return this.database.executeSql(`
    UPDATE usuarios SET
      nombre = ?, 
      apellido = ?, 
      email = ?, 
      clave = ?, 
      fecha_nacimiento = ?, 
      telefono = ?, 
      fecha_registro = ?, 
      rut = ?, 
      genero_id_genero = ?, 
      rol_usuarios_id_rol = ?
    WHERE id_usuario = ?
  `, data)
  .then(() => {
    this.getUsuarios().then(usuarios => {
      this.listaUsuarios.next(usuarios as any);
    });
  });
}
deleteUsuario(id_usuario: number){
  return this.database.executeSql('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario])
    .then(() => {
      this.getUsuarios().then(usuarios => {
        this.listaUsuarios.next(usuarios as any);
      });
    });
}


// Planes Membresia

getPlanesMembresia() {
  return this.database.executeSql('SELECT * FROM planes_membresia', []).then((res) => {
    let planes: PlanesMembresia[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        planes.push(res.rows.item(i));
      }
    }
    this.listaPlanesMembresia.next(planes as any);
  });
}

addPlanMembresia(nombre_plan: string, descripcion: string, precio: number, duracion_dias: number): Promise<any> {
  let data = [nombre_plan, descripcion, precio, duracion_dias];
  return this.database.executeSql(
    'INSERT INTO planes_membresia(nombre_plan, descripcion, precio, duracion_dias) VALUES(?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getPlanesMembresia().then(planes => {
      this.listaPlanesMembresia.next(planes as any);
    });
  });
}
updatePlanMembresia(id_plan: number, nombre_plan: string, descripcion: string, precio: number, duracion_dias: number) {
  let data = [nombre_plan, descripcion, precio, duracion_dias, id_plan];
  return this.database.executeSql(
    'UPDATE planes_membresia SET nombre_plan = ?, descripcion = ?, precio = ?, duracion_dias = ? WHERE id_plan = ?',
    data
  )
  .then(() => {
    this.getPlanesMembresia().then(planes => {
      this.listaPlanesMembresia.next(planes as any);
    });
  });
}
deletePlanMembresia(id_plan: number) {
  return this.database.executeSql('DELETE FROM planes_membresia WHERE id_plan = ?', [id_plan])
    .then(() => {
      this.getPlanesMembresia().then(planes => {
        this.listaPlanesMembresia.next(planes as any);
      });
    });
}

//Tablas de historial de rutinas
getHistorialRutinas() {
  return this.database.executeSql('SELECT * FROM historial_rutinas', []).then((res) => {
    let historial: HistorialRutinas[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        historial.push(res.rows.item(i));
      }
    }
    this.listaHistorialRutinas.next(historial as any);
    
  });
}
addHistorialRutina(fecha_realizacion: string, duracion_real: string, usuarios_id_usuario: number, rutinas_id_rutina: number) {
  let data = [fecha_realizacion, duracion_real, usuarios_id_usuario, rutinas_id_rutina];
  return this.database.executeSql(
    'INSERT INTO historial_rutinas(fecha_realizacion, duracion_real, usuarios_id_usuario, rutinas_id_rutina) VALUES(?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getHistorialRutinas().then(historial => {
      this.listaHistorialRutinas.next(historial as any);
    });
  });
}
// No se implementan métodos de actualización o eliminación para historial_rutinas

//tabla subscripcion

getSubscripciones(){
  return this.database.executeSql('SELECT * FROM subscripcion', []).then((res) => {
    let subscripciones: Subscripcion[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        subscripciones.push(res.rows.item(i));
      }
    }
    this.listaSubscripcion.next(subscripciones as any);
    
  });
}
addSubscripcion(monto: number, fechapago: string, metodo_pago: string, usuarios_id_usuario: number, planes_membresia_id_plan: number, estado_sub: string)   {
  let data = [monto, fechapago, metodo_pago, usuarios_id_usuario, planes_membresia_id_plan, estado_sub];
  return this.database.executeSql(
    'INSERT INTO subscripcion(monto, fechapago, metodo_pago, usuarios_id_usuario, planes_membresia_id_plan, estado_sub) VALUES(?, ?, ?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getSubscripciones().then(subscripciones => {
      this.listaSubscripcion.next(subscripciones as any);
    });
  });
}
updateSubscripcion(id_pago: number, monto: number, fechapago: string, metodo_pago: string, usuarios_id_usuario: number, planes_membresia_id_plan: number, estado_sub: string){
  let data = [monto, fechapago, metodo_pago, usuarios_id_usuario, planes_membresia_id_plan, estado_sub, id_pago];
  return this.database.executeSql(
    'UPDATE subscripcion SET monto = ?, fechapago = ?, metodo_pago = ?, usuarios_id_usuario = ?, planes_membresia_id_plan = ?, estado_sub = ? WHERE id_pago = ?',
    data
  )
  .then(() => {
    // Actualizar el BehaviorSubject
    this.getSubscripciones().then(subscripciones => {
      this.listaSubscripcion.next(subscripciones as any);
    });
  });
}
deleteSubscripcion(id_pago: number){
  return this.database.executeSql('DELETE FROM subscripcion WHERE id_pago = ?', [id_pago])
    .then(() => {
      // Actualizar el BehaviorSubject
      this.getSubscripciones().then(subscripciones => {
        this.listaSubscripcion.next(subscripciones as any);
      });
    });
}

//Tabla Progreso
getProgreso(){
  return this.database.executeSql('SELECT * FROM progreso', []).then((res) => {
    let progreso: Progreso[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        progreso.push(res.rows.item(i));
      }
    }
    this.listaProgreso.next(progreso as any);
    
  });
}
addProgreso(fecha: string, peso: number, porcentaje_grasa: number, masa_muscular: number, usuarios_id_usuario: number): Promise<any> {
  let data = [fecha, peso, porcentaje_grasa, masa_muscular, usuarios_id_usuario];
  return this.database.executeSql(
    'INSERT INTO progreso(fecha, peso, porcentaje_grasa, masa_muscular, usuarios_id_usuario) VALUES(?, ?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getProgreso().then(progresos => {
      this.listaProgreso.next(progresos as any);
    });
  });
}
updateProgreso(id_progreso: number, fecha: string, peso: number, porcentaje_grasa: number, masa_muscular: number, usuarios_id_usuario: number): Promise<any> {
  let data = [fecha, peso, porcentaje_grasa, masa_muscular, usuarios_id_usuario, id_progreso];
  return this.database.executeSql(
    'UPDATE progreso SET fecha = ?, peso = ?, porcentaje_grasa = ?, masa_muscular = ?, usuarios_id_usuario = ? WHERE id_progreso = ?',
    data
  )
  .then(() => {
    this.getProgreso().then(progresos => {
      this.listaProgreso.next(progresos as any);
    });
  });
}
deleteProgreso(id_progreso: number){
  return this.database.executeSql('DELETE FROM progreso WHERE id_progreso = ?', [id_progreso])
    .then(() => {
      this.getProgreso().then(progresos => {
        this.listaProgreso.next(progresos as any);
      });
    });
}


// Rutina_ejercicios
getRutinaEjercicios() {
  return this.database.executeSql('SELECT * FROM rutina_ejercicios', []).then((res) => {
    let rutinaEjercicios: RutinaEjercicios[] = [];
    if(res.rows.length > 0){
      //this.presentAlert("2","entra for");
      for (var i=0; i < res.rows.length; i++){
        //this.presentAlert("bbb",res.rows.item(i) );
        rutinaEjercicios.push(res.rows.item(i));
      }
    }
    this.listaRutinaEjercicios.next(rutinaEjercicios as any);
    
  });
}
addRutinaEjercicio(series: number, repeticiones: number, rutinas_id_rutina: number, ejercicios_id_ejercicios: number, tipo_rutina: string){
  let data = [series, repeticiones, rutinas_id_rutina, ejercicios_id_ejercicios, tipo_rutina];
  return this.database.executeSql(
    'INSERT INTO rutina_ejercicios(series, repeticiones, rutinas_id_rutina, ejercicios_id_ejercicios, tipo_rutina) VALUES(?, ?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getRutinaEjercicios().then(rutinaEjercicios => {
      this.listaRutinaEjercicios.next(rutinaEjercicios as any);
    });
  });
}
updateRutinaEjercicio(id: number, series: number, repeticiones: number, rutinas_id_rutina: number, ejercicios_id_ejercicios: number, tipo_rutina: string){
  let data = [series, repeticiones, rutinas_id_rutina, ejercicios_id_ejercicios, tipo_rutina, id];
  return this.database.executeSql(
    'UPDATE rutina_ejercicios SET series = ?, repeticiones = ?, rutinas_id_rutina = ?, ejercicios_id_ejercicios = ?, tipo_rutina = ? WHERE id = ?',
    data
  )
  .then(() => {
    this.getRutinaEjercicios().then(rutinaEjercicios => {
      this.listaRutinaEjercicios.next(rutinaEjercicios as any);
    });
  });
}
deleteRutinaEjercicio(id: number){
  return this.database.executeSql('DELETE FROM rutina_ejercicios WHERE id = ?', [id])
    .then(() => {
      this.getRutinaEjercicios().then(rutinaEjercicios => {
        this.listaRutinaEjercicios.next(rutinaEjercicios as any);
      });
    });
}

}






