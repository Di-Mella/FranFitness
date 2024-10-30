import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role-guard.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'lobby',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['Administrador'] }
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['Usuario'] }
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./pages/unauthorized/unauthorized.module').then( m => m.UnauthorizedPageModule)
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/access/access.module').then( m => m.AccessPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rutinas',
    loadChildren: () => import('./pages/rutinas/rutinas.module').then( m => m.RutinasPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'entrenamientos',
    loadChildren: () => import('./pages/entrenamientos/entrenamientos.module').then( m => m.EntrenamientosPageModule)
  },
  {
    path: 'progreso',
    loadChildren: () => import('./pages/progreso/progreso.module').then( m => m.ProgresoPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'documentos',
    loadChildren: () => import('./pages/documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'genero-listar',
    loadChildren: () => import('./pages/crud/genero-listar/genero-listar.module').then( m => m.GeneroListarPageModule)
  },
  {
    path: 'genero-modificar',
    loadChildren: () => import('./pages/crud/genero-modificar/genero-modificar.module').then( m => m.GeneroModificarPageModule)
  },
  {
    path: 'genero-agregar',
    loadChildren: () => import('./pages/crud/genero-agregar/genero-agregar.module').then( m => m.GeneroAgregarPageModule)
  },
  {
    path: 'rol-usuario-agregar',
    loadChildren: () => import('./pages/crud/rol-usuario-agregar/rol-usuario-agregar.module').then( m => m.RolUsuarioAgregarPageModule)
  },
  {
    path: 'rol-usuario-agregar',
    loadChildren: () => import('./pages/crud/rolUsuario/rol-usuario-agregar/rol-usuario-agregar.module').then( m => m.RolUsuarioAgregarPageModule)
  },
  {
    path: 'rol-usuario-modificar',
    loadChildren: () => import('./pages/crud/rolUsuario/rol-usuario-modificar/rol-usuario-modificar.module').then( m => m.RolUsuarioModificarPageModule)
  },
  {
    path: 'rol-usuario-listar',
    loadChildren: () => import('./pages/crud/rolUsuario/rol-usuario-listar/rol-usuario-listar.module').then( m => m.RolUsuarioListarPageModule)
  },
  {
    path: 'grupo-muscular-agregar',
    loadChildren: () => import('./pages/crud/grupoMuscular/grupo-muscular-agregar/grupo-muscular-agregar.module').then( m => m.GrupoMuscularAgregarPageModule)
  },
  {
    path: 'grupo-muscular-listar',
    loadChildren: () => import('./pages/crud/grupoMuscular/grupo-muscular-listar/grupo-muscular-listar.module').then( m => m.GrupoMuscularListarPageModule)
  },
  {
    path: 'grupo-muscular-modificar',
    loadChildren: () => import('./pages/crud/grupoMuscular/grupo-muscular-modificar/grupo-muscular-modificar.module').then( m => m.GrupoMuscularModificarPageModule)
  },
  {
    path: 'ejercicios-modificar',
    loadChildren: () => import('./pages/crud/ejericios/ejercicios-modificar/ejercicios-modificar.module').then( m => m.EjerciciosModificarPageModule)
  },
  {
    path: 'ejercicios-listar',
    loadChildren: () => import('./pages/crud/ejericios/ejercicios-listar/ejercicios-listar.module').then( m => m.EjerciciosListarPageModule)
  },
  {
    path: 'ejercicios-agregar',
    loadChildren: () => import('./pages/crud/ejericios/ejercicios-agregar/ejercicios-agregar.module').then( m => m.EjerciciosAgregarPageModule)
  },
  {
    path: 'rutinas-agregar',
    loadChildren: () => import('./pages/crud/rutinas/rutinas-agregar/rutinas-agregar.module').then( m => m.RutinasAgregarPageModule)
  },
  {
    path: 'rutinas-modificar',
    loadChildren: () => import('./pages/crud/rutinas/rutinas-modificar/rutinas-modificar.module').then( m => m.RutinasModificarPageModule)
  },
  {
    path: 'rutinas-listar',
    loadChildren: () => import('./pages/crud/rutinas/rutinas-listar/rutinas-listar.module').then( m => m.RutinasListarPageModule)
  },
  {
    path: 'usuarios-listar',
    loadChildren: () => import('./pages/crud/usuarios/usuarios-listar/usuarios-listar.module').then( m => m.UsuariosListarPageModule)
  },
  {
    path: 'usuarios-agregar',
    loadChildren: () => import('./pages/crud/usuarios/usuarios-agregar/usuarios-agregar.module').then( m => m.UsuariosAgregarPageModule)
  },
  {
    path: 'usuarios-modificar',
    loadChildren: () => import('./pages/crud/usuarios/usuarios-modificar/usuarios-modificar.module').then( m => m.UsuariosModificarPageModule)
  },
  {
    path: 'planes-membresia-modificar',
    loadChildren: () => import('./pages/crud/planesMembresia/planes-membresia-modificar/planes-membresia-modificar.module').then( m => m.PlanesMembresiaModificarPageModule)
  },
  {
    path: 'planes-membresia-listar',
    loadChildren: () => import('./pages/crud/planesMembresia/planes-membresia-listar/planes-membresia-listar.module').then( m => m.PlanesMembresiaListarPageModule)
  },
  {
    path: 'planes-membresia-agregar',
    loadChildren: () => import('./pages/crud/planesMembresia/planes-membresia-agregar/planes-membresia-agregar.module').then( m => m.PlanesMembresiaAgregarPageModule)
  },
  {
    path: 'datospersonales',
    loadChildren: () => import('./pages/datospersonales/datospersonales.module').then( m => m.DatospersonalesPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'lobby',
    loadChildren: () => import('./pages/lobby/lobby.module').then( m => m.LobbyPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
