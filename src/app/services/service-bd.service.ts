import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, endWith, from, generate, Observable } from 'rxjs';
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
  listaGenero = new BehaviorSubject<Genero[]>([]);
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
      await this.insertarDatosPorDefecto();
      this.isDBready.next(true);

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

  async insertarDatosPorDefecto(){
    // Insertar datos tabla genero 
    try {
      const resGenero = await this.database.executeSql('SELECT COUNT (ID_GENERO) as count from genero',[]);
      if (resGenero.rows.item(0).count === 0 ){
        const generos =[
          {id_genero: 1, tipo_genero:'Masculino'},
          {id_genero: 2, tipo_genero:'Femenino'},
          {id_genero: 3, tipo_genero:'Otro'}
        ];
        for(const genero of generos ){
          await this.database.executeSql(
            'INSERT INTO genero(id_genero, tipo_genero) VALUES(?,?)',
            [genero.id_genero, genero.tipo_genero]
          );
        }
      }
      const resRol = await this.database.executeSql('SELECT COUNT(id_rol)as count FROM rol_usuarios',[]);
      if (resRol.rows.item(0).count === 0) {
        const roles = [
          { id_rol: 1, nombrerol: 'Administrador' },
          { id_rol: 2, nombrerol: 'Usuario' }
        ];
        for (const rol of roles) {
          await this.database.executeSql(
            'INSERT INTO rol_usuarios(id_rol, nombrerol) VALUES(?, ?)',
            [rol.id_rol, rol.nombrerol]
          );
        }
      }
      const resGrupoMuscular= await this.database.executeSql('SELECT(id_grupo_muscular as count FROM grupo_muscular)')
      if ( resGrupoMuscular.rows.item(0).count === 0 ){
        const grupos = [
          {id_grupo_muscular: 1, nombre_grupomuscular: 'Pecho'},
          {id_grupo_muscular: 2, nombre_grupomuscular: 'Espalda'},
          {id_grupo_muscular: 3, nombre_grupomuscular: 'Pierna'},
          {id_grupo_muscular: 4, nombre_grupomuscular: 'Abdomen'},
          {id_grupo_muscular: 5, nombre_grupomuscular: 'Brazos'},
        ];
        for(const grupo of grupos){
          await this.database.executeSql(
            'INSERT INTO grupo_muscular (id_rol, nombre_grupomuscular) VALUES(?,?)',
          [ grupo.id_grupo_muscular, grupo.nombre_grupomuscular]
          )
        }
      }
      const resEjercicios = await this.database.executeSql('SELECT COUNT(id_ejercicios) as count FROM ejercicios', []);
      if (resEjercicios.rows.item(0).count === 0) {
        const ejercicios = [
          // Pecho
          { id_ejercicios: 1, nombre: 'Press de banca', descripcion: 'Ejercicio para trabajar el pecho', grupo_muscular_id_grupo_muscular: 1 },
          { id_ejercicios: 2, nombre: 'Aperturas con mancuernas', descripcion: 'Ejercicio para abrir y fortalecer los músculos del pecho', grupo_muscular_id_grupo_muscular: 1 },
          { id_ejercicios: 3, nombre: 'Press inclinado', descripcion: 'Ejercicio para trabajar la parte superior del pecho', grupo_muscular_id_grupo_muscular: 1 },
          
          // Espalda
          { id_ejercicios: 4, nombre: 'Remo con barra', descripcion: 'Ejercicio para fortalecer la espalda', grupo_muscular_id_grupo_muscular: 2 },
          { id_ejercicios: 5, nombre: 'Dominadas', descripcion: 'Ejercicio para trabajar toda la espalda', grupo_muscular_id_grupo_muscular: 2 },
          { id_ejercicios: 6, nombre: 'Pulldown con polea', descripcion: 'Ejercicio para trabajar los dorsales', grupo_muscular_id_grupo_muscular: 2 },
          
          // Piernas - Cuádriceps
          { id_ejercicios: 7, nombre: 'Sentadillas', descripcion: 'Ejercicio para fortalecer los cuádriceps', grupo_muscular_id_grupo_muscular: 3 },
          { id_ejercicios: 8, nombre: 'Prensa de piernas', descripcion: 'Ejercicio para trabajar los cuádriceps y glúteos', grupo_muscular_id_grupo_muscular: 3 },
          
          // Piernas - Isquiotibiales
          { id_ejercicios: 9, nombre: 'Curl de piernas', descripcion: 'Ejercicio para trabajar los isquiotibiales', grupo_muscular_id_grupo_muscular: 3 },
          { id_ejercicios: 10, nombre: 'Peso muerto', descripcion: 'Ejercicio que involucra principalmente los isquiotibiales y glúteos', grupo_muscular_id_grupo_muscular: 3 },
          
          // Piernas - Gemelos
          { id_ejercicios: 11, nombre: 'Elevación de talones', descripcion: 'Ejercicio para fortalecer los gemelos', grupo_muscular_id_grupo_muscular: 3 },
          { id_ejercicios: 12, nombre: 'Elevación de talones en máquina', descripcion: 'Ejercicio para trabajar los gemelos en profundidad', grupo_muscular_id_grupo_muscular: 3 },
          
          // Piernas - Glúteos
          { id_ejercicios: 13, nombre: 'Puente de glúteos', descripcion: 'Ejercicio para trabajar los glúteos', grupo_muscular_id_grupo_muscular: 3 },
          { id_ejercicios: 14, nombre: 'Patada trasera en máquina', descripcion: 'Ejercicio para fortalecer los glúteos', grupo_muscular_id_grupo_muscular: 3 },
        
          // Abdomen
          { id_ejercicios: 15, nombre: 'Crunch', descripcion: 'Ejercicio básico para trabajar el abdomen', grupo_muscular_id_grupo_muscular: 4 },
          { id_ejercicios: 16, nombre: 'Elevación de piernas', descripcion: 'Ejercicio para fortalecer el abdomen inferior', grupo_muscular_id_grupo_muscular: 4 },
          
          // Abdomen - Oblicuos
          { id_ejercicios: 17, nombre: 'Russian Twist', descripcion: 'Ejercicio para trabajar los oblicuos', grupo_muscular_id_grupo_muscular: 4 },
          { id_ejercicios: 18, nombre: 'Plancha lateral', descripcion: 'Ejercicio para fortalecer los oblicuos y el core', grupo_muscular_id_grupo_muscular: 4 },
          
          // Abdomen - Lumbar
          { id_ejercicios: 19, nombre: 'Hiperextensiones', descripcion: 'Ejercicio para trabajar la zona lumbar', grupo_muscular_id_grupo_muscular: 4 },
          { id_ejercicios: 20, nombre: 'Superman', descripcion: 'Ejercicio para fortalecer la zona lumbar', grupo_muscular_id_grupo_muscular: 4 },
          
          // Brazos - Bíceps
          { id_ejercicios: 21, nombre: 'Curl de bíceps con barra', descripcion: 'Ejercicio para trabajar los bíceps', grupo_muscular_id_grupo_muscular: 5 },
          { id_ejercicios: 22, nombre: 'Curl de martillo', descripcion: 'Ejercicio para trabajar el braquial y bíceps', grupo_muscular_id_grupo_muscular: 5 },
          { id_ejercicios: 23, nombre: 'Curl concentrado', descripcion: 'Ejercicio para aislar los bíceps', grupo_muscular_id_grupo_muscular: 5 },
        
          // Brazos - Tríceps
          { id_ejercicios: 24, nombre: 'Extensión de tríceps en polea', descripcion: 'Ejercicio para trabajar los tríceps', grupo_muscular_id_grupo_muscular: 5 },
          { id_ejercicios: 25, nombre: 'Press francés', descripcion: 'Ejercicio para fortalecer los tríceps', grupo_muscular_id_grupo_muscular: 5 },
          { id_ejercicios: 26, nombre: 'Fondos de tríceps', descripcion: 'Ejercicio para trabajar los tríceps en paralelo', grupo_muscular_id_grupo_muscular: 5 },
          
          // Brazos - Hombros
          { id_ejercicios: 27, nombre: 'Press militar', descripcion: 'Ejercicio para trabajar los hombros', grupo_muscular_id_grupo_muscular: 5 },
          { id_ejercicios: 28, nombre: 'Elevaciones laterales', descripcion: 'Ejercicio para trabajar los deltoides laterales', grupo_muscular_id_grupo_muscular: 5 },
          { id_ejercicios: 29, nombre: 'Pájaros', descripcion: 'Ejercicio para trabajar los deltoides posteriores', grupo_muscular_id_grupo_muscular: 5 },
        ];        
          for (const ejercicio of ejercicios) {
            await this.database.executeSql(
              'INSERT INTO ejercicios (id_ejercicios, nombre, descripcion, grupo_muscular_id_grupo_muscular) VALUES (?, ?, ?, ?)',
              [ejercicio.id_ejercicios, ejercicio.nombre, ejercicio.descripcion, ejercicio.grupo_muscular_id_grupo_muscular]
            );
          }
      }

      const resPlanesMembresia = await this.database.executeSql('SELECT COUNT(id_plan) as count FROM planes_membresia', []);
      if (resPlanesMembresia.rows.item(0).count === 0) {
        const planes = [
          { id_plan: 1, nombre_plan: 'Básico', descripcion: 'Acceso a todas las máquinas y entrenamientos básicos.', precio: 19.99, duracion_dias: 30 },
          { id_plan: 2, nombre_plan: 'Premium', descripcion: 'Acceso a todas las máquinas, entrenamientos grupales y 2 sesiones de personal trainer.', precio: 49.99, duracion_dias: 30 },
          { id_plan: 3, nombre_plan: 'Avanzado', descripcion: 'Acceso a todas las máquinas, entrenamientos grupales, sesiones ilimitadas de personal trainer y acceso a área VIP.', precio: 79.99, duracion_dias: 30 },
          { id_plan: 4, nombre_plan: 'Anual Básico', descripcion: 'Acceso básico durante un año con descuentos especiales.', precio: 199.99, duracion_dias: 365 },
          { id_plan: 5, nombre_plan: 'Anual Premium', descripcion: 'Acceso premium durante un año con todos los beneficios y descuentos en productos.', precio: 499.99, duracion_dias: 365 },
        ];
          for (const plan of planes) {
            await this.database.executeSql(
              'INSERT INTO planes_membresia (id_plan, nombre_plan, descripcion, precio, duracion_dias) VALUES(?, ?, ?, ?, ?)',
              [plan.id_plan, plan.nombre_plan, plan.descripcion, plan.precio, plan.duracion_dias]
            );
          }
      }
    } catch (e) {
      this.presentAlert('Insertar Datos por Defecto', 'Error: ' + JSON.stringify(e));
    }
  }

     // Método para cargar datos iniciales en los BehaviorSubjects
async cargarDatosIniciales() {
    // Cargar generos
    const generos = await this.getGeneros();
    this.listaGenero.next(generos);

    // Cargar roles de usuarios
    const roles = await this.getRoles();
    this.listaRolUsuarios.next(roles);

    // Cargar grupo muscular
    const grupos = await this.getGrupoMuscular();
    this.listaGrupoMuscular.next(grupos);

    // Cargar ejercicios
    const ejercicios= await this.getEjercicios();
    this.listaEjercicios.next(ejercicios);

    // Cargar rutinas
    const rutinas = await this.getRutinas();
    this.listaRutinas.next(rutinas);

    // Cargar usuarios
    const usuarios = await this.getUsuarios();
    this.listaUsuarios.next(usuarios);

    // Cargar planes de membresía
    const planes = await this.getPlanesMembresia();
    this.listaPlanesMembresia.next(planes);

    // Cargar historial de rutinas
    const historial = await this.getHistorialRutinas();
    this.listaHistorialRutinas.next(historial);

    // Cargar subscripciones
    const subscripciones = await this.getSubscripciones();
    this.listaSubscripcion.next(subscripciones);

    // Cargar progreso
    const progresos = await this.getProgreso();
    this.listaProgreso.next(progresos);

    // Cargar rutina_ejercicios
    const rutinaEjercicios = await this.getRutinaEjercicios();
    this.listaRutinaEjercicios.next(rutinaEjercicios);
  }

  // crud para los metodos

  // Genero
  getGeneros(): Promise<Genero[]>{
    return this.database.executeSql('SELECT * FROM genero',[]).then((res)=>{
      let generos: Genero[]=[];
      for (let i=0; i <res.rows.item(i); i++){
        generos.push(res.rows.item(i));
      }
      return generos;
    });
  }
  addGenero(tipo_genero: string): Promise<any> {
    let data=[tipo_genero];
    return this.database.executeSql('INSERT INTO genero(tipo_genero) VALUES(?)',data)
    .then(()=> {
      this.getGeneros().then(generos =>{
        this.listaGenero.next(generos);
      });
    });
  }
  updateGenero(id_genero: number, tipo_genero: string): Promise <any>{
    let data= [tipo_genero, id_genero]
    return this.database.executeSql('UPDATE genero SET tipo_genero = ? WHERE id_genero = ?', data)
      .then(() => {

        this.getGeneros().then(generos => {
          this.listaGenero.next(generos);
        });
      });
  }
  deleteGenero(id_genero: number): Promise<any>{
    return this.database.executeSql('DELETE FROM genero WHERE id_genero = ?',[id_genero])
    .then (()=>{
      this.getGeneros().then(generos => {
        this.listaGenero.next(generos);
      });
    });
  }

// Tabla ROLES

getRoles(): Promise<RolUsuarios[]> {
  return this.database.executeSql('SELECT * FROM rol_usuarios', []).then((res)=> {
    let roles: RolUsuarios[]=[];
    for(let i=0; i< res.rows.length; i++){
      roles.push(res.rows.item(i));
    }
    return roles;
  });
}
addRol(nombrerol: string): Promise<any> {
  let data = [nombrerol];
  return this.database.executeSql('INSERT INTO rol_usuarios(nombrerol) VALUES(?)', data)
    .then(() => {
      this.getRoles().then(roles => {
        this.listaRolUsuarios.next(roles);
      });
    });
}
updateRol(id_rol: number, nombrerol: string): Promise<any> {
  let data = [nombrerol, id_rol];
  return this.database.executeSql('UPDATE rol_usuarios SET nombrerol = ? WHERE id_rol = ?', data)
    .then(() => {
      this.getRoles().then(roles => {
        this.listaRolUsuarios.next(roles);
      });
    });
}
deleteRol(id_rol: number): Promise<any> {
  return this.database.executeSql('DELETE FROM rol_usuarios WHERE id_rol = ?', [id_rol])
    .then(() => {
      this.getRoles().then(roles => {
        this.listaRolUsuarios.next(roles);
      });
    });
}
// Tabla muscular
getGrupoMuscular(): Promise<GrupoMuscular[]> {
  return this.database.executeSql('SELECT * FROM grupo_muscular', []).then((res) => {
    let grupos: GrupoMuscular[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      grupos.push(res.rows.item(i));
    }
    return grupos;
  });
}
addGrupoMuscular(nombre_grupomuscular: string): Promise<any> {
  let data = [nombre_grupomuscular];
  return this.database.executeSql('INSERT INTO grupo_muscular(nombre_grupomuscular) VALUES(?)', data)
    .then(() => {
      this.getGrupoMuscular().then(grupos => {
        this.listaGrupoMuscular.next(grupos);
      });
    });
}
updateGrupoMuscular(id_grupo_muscular: number, nombre_grupomuscular: string): Promise<any> {
  let data = [nombre_grupomuscular, id_grupo_muscular];
  return this.database.executeSql('UPDATE grupo_muscular SET nombre_grupomuscular = ? WHERE id_grupo_muscular = ?', data)
    .then(() => {
      this.getGrupoMuscular().then(grupos => {
        this.listaGrupoMuscular.next(grupos);
      });
    });
}
deleteGrupoMuscular(id_grupo_muscular: number): Promise<any> {
  return this.database.executeSql('DELETE FROM grupo_muscular WHERE id_grupo_muscular = ?', [id_grupo_muscular])
    .then(() => {
      this.getGrupoMuscular().then(grupos => {
        this.listaGrupoMuscular.next(grupos);
      });
    });
}
//Tabla Ejercicios
getEjercicios(): Promise<Ejercicios[]> {
  return this.database.executeSql('SELECT * FROM ejercicios', []).then((res) => {
    let ejercicios: Ejercicios[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      ejercicios.push(res.rows.item(i));
    }
    return ejercicios;
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
      this.listaEjercicios.next(ejercicios);
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
      this.listaEjercicios.next(ejercicios);
    });
  });
}
deleteEjercicio(id_ejercicios: number): Promise<any> {
  return this.database.executeSql('DELETE FROM ejercicios WHERE id_ejercicios = ?', [id_ejercicios])
    .then(() => {
      this.getEjercicios().then(ejercicios => {
        this.listaEjercicios.next(ejercicios);
      });
    });
}
// Tabla rutinas
getRutinas(): Promise<Rutinas[]> {
  return this.database.executeSql('SELECT * FROM rutinas', []).then((res) => {
    let rutinas: Rutinas[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      rutinas.push(res.rows.item(i));
    }
    return rutinas;
  });
}
addRutina(nombre: string, descripcion: string, nivel_dificultad: string, duracion_minutos: number): Promise<any> {
  let data = [nombre, descripcion, nivel_dificultad, duracion_minutos];
  return this.database.executeSql(
    'INSERT INTO rutinas(nombre, descripcion, nivel_dificultad, duracion_minutos) VALUES(?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getRutinas().then(rutinas => {
      this.listaRutinas.next(rutinas);
    });
  });
}
updateRutina(id_rutina: number, nombre: string, descripcion: string, nivel_dificultad: string, duracion_minutos: number): Promise<any> {
  let data = [nombre, descripcion, nivel_dificultad, duracion_minutos, id_rutina];
  return this.database.executeSql(
    'UPDATE rutinas SET nombre = ?, descripcion = ?, nivel_dificultad = ?, duracion_minutos = ? WHERE id_rutina = ?',
    data
  )
  .then(() => {
    this.getRutinas().then(rutinas => {
      this.listaRutinas.next(rutinas);
    });
  });
}
deleteRutina(id_rutina: number): Promise<any> {
  return this.database.executeSql('DELETE FROM rutinas WHERE id_rutina = ?', [id_rutina])
    .then(() => {
      this.getRutinas().then(rutinas => {
        this.listaRutinas.next(rutinas);
      });
    });
}

// Tabla Usuarios
getUsuarios(): Promise<Usuarios[]> {
  return this.database.executeSql(`
    SELECT usuarios.*, genero.tipo_genero, rol_usuarios.nombrerol
    FROM usuarios
    JOIN genero ON usuarios.genero_id_genero = genero.id_genero
    JOIN rol_usuarios ON usuarios.rol_usuarios_id_rol = rol_usuarios.id_rol
  `, []).then((res) => {
    let usuarios: Usuarios[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      usuarios.push(res.rows.item(i));
    }
    return usuarios;
  });
}
addUsuario(usuario: Usuarios): Promise<any> {
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
      this.listaUsuarios.next(usuarios);
    });
  });
}
updateUsuario(id_usuario: number, usuario: Usuarios): Promise<any> {
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
      this.listaUsuarios.next(usuarios);
    });
  });
}
deleteUsuario(id_usuario: number): Promise<any> {
  return this.database.executeSql('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario])
    .then(() => {
      this.getUsuarios().then(usuarios => {
        this.listaUsuarios.next(usuarios);
      });
    });
}


// Planes Membresia

getPlanesMembresia(): Promise<PlanesMembresia[]> {
  return this.database.executeSql('SELECT * FROM planes_membresia', []).then((res) => {
    let planes: PlanesMembresia[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      planes.push(res.rows.item(i));
    }
    return planes;
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
      this.listaPlanesMembresia.next(planes);
    });
  });
}
updatePlanMembresia(id_plan: number, nombre_plan: string, descripcion: string, precio: number, duracion_dias: number): Promise<any> {
  let data = [nombre_plan, descripcion, precio, duracion_dias, id_plan];
  return this.database.executeSql(
    'UPDATE planes_membresia SET nombre_plan = ?, descripcion = ?, precio = ?, duracion_dias = ? WHERE id_plan = ?',
    data
  )
  .then(() => {
    this.getPlanesMembresia().then(planes => {
      this.listaPlanesMembresia.next(planes);
    });
  });
}
deletePlanMembresia(id_plan: number): Promise<any> {
  return this.database.executeSql('DELETE FROM planes_membresia WHERE id_plan = ?', [id_plan])
    .then(() => {
      this.getPlanesMembresia().then(planes => {
        this.listaPlanesMembresia.next(planes);
      });
    });
}

//Tablas de historial de rutinas
getHistorialRutinas(): Promise<HistorialRutinas[]> {
  return this.database.executeSql('SELECT * FROM historial_rutinas', []).then((res) => {
    let historial: HistorialRutinas[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      historial.push(res.rows.item(i));
    }
    return historial;
  });
}
addHistorialRutina(fecha_realizacion: string, duracion_real: string, usuarios_id_usuario: number, rutinas_id_rutina: number): Promise<any> {
  let data = [fecha_realizacion, duracion_real, usuarios_id_usuario, rutinas_id_rutina];
  return this.database.executeSql(
    'INSERT INTO historial_rutinas(fecha_realizacion, duracion_real, usuarios_id_usuario, rutinas_id_rutina) VALUES(?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getHistorialRutinas().then(historial => {
      this.listaHistorialRutinas.next(historial);
    });
  });
}
// No se implementan métodos de actualización o eliminación para historial_rutinas

//tabla subscripcion

getSubscripciones(): Promise<Subscripcion[]> {
  return this.database.executeSql('SELECT * FROM subscripcion', []).then((res) => {
    let subscripciones: Subscripcion[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      subscripciones.push(res.rows.item(i));
    }
    return subscripciones;
  });
}
addSubscripcion(monto: number, fechapago: string, metodo_pago: string, usuarios_id_usuario: number, planes_membresia_id_plan: number, estado_sub: string): Promise<any> {
  let data = [monto, fechapago, metodo_pago, usuarios_id_usuario, planes_membresia_id_plan, estado_sub];
  return this.database.executeSql(
    'INSERT INTO subscripcion(monto, fechapago, metodo_pago, usuarios_id_usuario, planes_membresia_id_plan, estado_sub) VALUES(?, ?, ?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getSubscripciones().then(subscripciones => {
      this.listaSubscripcion.next(subscripciones);
    });
  });
}
updateSubscripcion(id_pago: number, monto: number, fechapago: string, metodo_pago: string, usuarios_id_usuario: number, planes_membresia_id_plan: number, estado_sub: string): Promise<any> {
  let data = [monto, fechapago, metodo_pago, usuarios_id_usuario, planes_membresia_id_plan, estado_sub, id_pago];
  return this.database.executeSql(
    'UPDATE subscripcion SET monto = ?, fechapago = ?, metodo_pago = ?, usuarios_id_usuario = ?, planes_membresia_id_plan = ?, estado_sub = ? WHERE id_pago = ?',
    data
  )
  .then(() => {
    // Actualizar el BehaviorSubject
    this.getSubscripciones().then(subscripciones => {
      this.listaSubscripcion.next(subscripciones);
    });
  });
}
deleteSubscripcion(id_pago: number): Promise<any> {
  return this.database.executeSql('DELETE FROM subscripcion WHERE id_pago = ?', [id_pago])
    .then(() => {
      // Actualizar el BehaviorSubject
      this.getSubscripciones().then(subscripciones => {
        this.listaSubscripcion.next(subscripciones);
      });
    });
}

//Tabla Progreso
getProgreso(): Promise<Progreso[]> {
  return this.database.executeSql('SELECT * FROM progreso', []).then((res) => {
    let progresos: Progreso[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      progresos.push(res.rows.item(i));
    }
    return progresos;
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
      this.listaProgreso.next(progresos);
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
      this.listaProgreso.next(progresos);
    });
  });
}
deleteProgreso(id_progreso: number): Promise<any> {
  return this.database.executeSql('DELETE FROM progreso WHERE id_progreso = ?', [id_progreso])
    .then(() => {
      this.getProgreso().then(progresos => {
        this.listaProgreso.next(progresos);
      });
    });
}


// Rutina_ejercicios
getRutinaEjercicios(): Promise<RutinaEjercicios[]> {
  return this.database.executeSql('SELECT * FROM rutina_ejercicios', []).then((res) => {
    let rutinaEjercicios: RutinaEjercicios[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      rutinaEjercicios.push(res.rows.item(i));
    }
    return rutinaEjercicios;
  });
}
addRutinaEjercicio(series: number, repeticiones: number, rutinas_id_rutina: number, ejercicios_id_ejercicios: number, tipo_rutina: string): Promise<any> {
  let data = [series, repeticiones, rutinas_id_rutina, ejercicios_id_ejercicios, tipo_rutina];
  return this.database.executeSql(
    'INSERT INTO rutina_ejercicios(series, repeticiones, rutinas_id_rutina, ejercicios_id_ejercicios, tipo_rutina) VALUES(?, ?, ?, ?, ?)',
    data
  )
  .then(() => {
    this.getRutinaEjercicios().then(rutinaEjercicios => {
      this.listaRutinaEjercicios.next(rutinaEjercicios);
    });
  });
}
updateRutinaEjercicio(id: number, series: number, repeticiones: number, rutinas_id_rutina: number, ejercicios_id_ejercicios: number, tipo_rutina: string): Promise<any> {
  let data = [series, repeticiones, rutinas_id_rutina, ejercicios_id_ejercicios, tipo_rutina, id];
  return this.database.executeSql(
    'UPDATE rutina_ejercicios SET series = ?, repeticiones = ?, rutinas_id_rutina = ?, ejercicios_id_ejercicios = ?, tipo_rutina = ? WHERE id = ?',
    data
  )
  .then(() => {
    this.getRutinaEjercicios().then(rutinaEjercicios => {
      this.listaRutinaEjercicios.next(rutinaEjercicios);
    });
  });
}
deleteRutinaEjercicio(id: number): Promise<any> {
  return this.database.executeSql('DELETE FROM rutina_ejercicios WHERE id = ?', [id])
    .then(() => {
      this.getRutinaEjercicios().then(rutinaEjercicios => {
        this.listaRutinaEjercicios.next(rutinaEjercicios);
      });
    });
}



// Metodos adicionales
getUsuarioByEmail(email: string): Promise<Usuarios | null> {
  return this.database.executeSql('SELECT * FROM usuarios WHERE email = ?', [email])
    .then((res) => {
      if (res.rows.length > 0) {
        return res.rows.item(0);
      }
      return null;
    });
}


getRutinasByNivel(nivel: string): Promise<Rutinas[]> {
  return this.database.executeSql('SELECT * FROM rutinas WHERE nivel_dificultad = ?', [nivel])
    .then((res) => {
      let rutinas: Rutinas[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        rutinas.push(res.rows.item(i));
      }
      return rutinas;
    });
}

getEjerciciosByGrupoMuscular(id_grupo_muscular: number): Promise<Ejercicios[]> {
  return this.database.executeSql('SELECT * FROM ejercicios WHERE grupo_muscular_id_grupo_muscular = ?', [id_grupo_muscular])
    .then((res) => {
      let ejercicios: Ejercicios[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        ejercicios.push(res.rows.item(i));
      }
      return ejercicios;
    });
}

getRutinasConEjercicios(): Promise<any[]> {
  return this.database.executeSql(`
    SELECT rutinas.*, rutina_ejercicios.series, rutina_ejercicios.repeticiones, rutina_ejercicios.tipo_rutina, ejercicios.nombre as ejercicio_nombre
    FROM rutinas
    JOIN rutina_ejercicios ON rutinas.id_rutina = rutina_ejercicios.rutinas_id_rutina
    JOIN ejercicios ON rutina_ejercicios.ejercicios_id_ejercicios = ejercicios.id_ejercicios
  `, [])
  .then((res) => {
    let rutinasConEjercicios: any[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      rutinasConEjercicios.push(res.rows.item(i));
    }
    return rutinasConEjercicios;
  });
}

getProgresoByFecha(usuario_id: number, fechaInicio: string, fechaFin: string): Promise<Progreso[]> {
  return this.database.executeSql('SELECT * FROM progreso WHERE usuarios_id_usuario = ? AND fecha BETWEEN ? AND ?', [usuario_id, fechaInicio, fechaFin])
    .then((res) => {
      let progresos: Progreso[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        progresos.push(res.rows.item(i));
      }
      return progresos;
    });
}

}






