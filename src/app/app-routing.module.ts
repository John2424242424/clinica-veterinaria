import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMascotaComponent } from './components/mascotas/crear-mascota/crear-mascota.component';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { ConsultarMascotaComponent } from './components/mascotas/consultar-mascota/consultar-mascota.component';
import { EditarMascotaComponent } from './components/mascotas/editar-mascota/editar-mascota.component';
import { CrearCitasComponent } from './components/citas/crear-citas/crear-citas.component';
import { EditarCitaComponent } from './components/citas/editar-cita/editar-cita.component';
import { ConsultarCitasComponent } from './components/citas/consultar-citas/consultar-citas.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  { path: 'login', component: LoginComponent },
  { path: 'crear-mascotas', component: CrearMascotaComponent, canActivate: [AuthGuard] },
  { path: 'side-bar', component: SideBarComponent, canActivate: [AuthGuard] },
  { path: 'consultar-mascotas', component: ConsultarMascotaComponent, canActivate: [AuthGuard] },
  { path: 'editar-mascota/:id', component: EditarMascotaComponent, canActivate: [AuthGuard] },
  { path: 'crear-cita', component: CrearCitasComponent, canActivate: [AuthGuard] },
  { path: 'editar-cita/:id', component: EditarCitaComponent, canActivate: [AuthGuard] },
  { path: 'consultar-citas', component: ConsultarCitasComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
