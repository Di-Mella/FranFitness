export interface Usuario {
    id_usuario: number;
    nombre: string;
    apellido: string;
    email: string;
    clave: string; // Contraseña hasheada
    fecha_nacimiento: string;
    telefono: string;
    fecha_registro: string;
    rut: string;
    genero_id_genero: number;
    rol_usuarios_id_rol: number;
  }