import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearMascotaComponent } from './components/mascotas/crear-mascota/crear-mascota.component';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './components/shared/side-bar/side-bar.component';
import { ConsultarMascotaComponent } from './components/mascotas/consultar-mascota/consultar-mascota.component';
import { EditarMascotaComponent } from './components/mascotas/editar-mascota/editar-mascota.component';
import { EditarCitaComponent } from './components/citas/editar-cita/editar-cita.component';
import { ConsultarCitasComponent } from './components/citas/consultar-citas/consultar-citas.component';
import { CrearCitasComponent } from './components/citas/crear-citas/crear-citas.component';
import { LoginComponent } from './components/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    CrearMascotaComponent,
    ConsultarMascotaComponent,
    EditarMascotaComponent,
    CrearCitasComponent,
    EditarCitaComponent,
    ConsultarCitasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
