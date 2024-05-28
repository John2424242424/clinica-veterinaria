import { Component, HostListener, OnInit } from '@angular/core';
import { ApiCitasServiceService } from 'src/app/services/api-citas-service.service';
import { Router } from '@angular/router';

interface IAgendaCitasVeterinarios {
  id: number;
  fecha: string;
  hora: string;
  veterinario: {
    identificacion: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    direccion: string;
  };
  sedeCita: {
    id: number;
    nombre: string;
    direccion: string;
  };
  tipoCita: {
    id: number;
    nombre: string;
  };
}

interface ICliente {
  identificacion: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  email: string;
}

interface IMascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  cliente: ICliente | null;
}

@Component({
  selector: 'app-crear-citas',
  templateUrl: './crear-citas.component.html',
  styleUrls: ['./crear-citas.component.css']
})
export class CrearCitasComponent implements OnInit {
  dropdownOpen: string | null = null;
  tipoCitas: any[] = [];
  mascotas: IMascota[] = [];
  agendaCitasVeterinarios: IAgendaCitasVeterinarios[] = [];
  mascotaSeleccionada: any = null;
  citaSeleccionada: any = null;
  identificacionCliente!: string;

  constructor(private apiCitasService: ApiCitasServiceService, private router: Router) { }

  ngOnInit(): void {
    this.identificacionCliente = this.getIdentificacionCliente();
    this.getAllTipoCitas();
    this.getAllMascotas();
  }

  getIdentificacionCliente(): string {
    this.identificacionCliente = '19283921'; // Aquí deberías obtener la identificación del cliente que está logueado 
    return this.identificacionCliente;
  }
  
  toggleDropdown(menu: string) {
    this.dropdownOpen = this.dropdownOpen === menu ? null : menu;
  }

  seleccionarMascota(mascota: any) {
    this.mascotaSeleccionada = mascota;
    this.dropdownOpen = null;
  }

  seleccionarCita(cita: any) {
    this.citaSeleccionada = cita;
    this.getAllAgendaCitasVeterinarios();
    this.dropdownOpen = null;
  }

  filtrarCitasPorTipoCita(): void {
    if (this.citaSeleccionada) {
      this.agendaCitasVeterinarios = this.agendaCitasVeterinarios.filter(cita => cita.tipoCita.nombre === this.citaSeleccionada.nombre);
    }
  }

  getAllTipoCitas(): void {
    this.apiCitasService.getTipoCitasList().subscribe(
      response => {
        this.tipoCitas = response;
        console.log('Tipos de citas:', response);
      },
      error => {
        console.error('Error al obtener los tipos de citas:', error);
      }
    );
  }

  getAllMascotas(): void {
    this.apiCitasService.getMascotasList().subscribe(
      (mascotas: IMascota[]) => {
        this.mascotas = mascotas.filter(mascota => mascota.cliente && mascota.cliente.identificacion === this.identificacionCliente);
      },
      (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    );
  }


  getAllAgendaCitasVeterinarios(): void {
    if (this.citaSeleccionada) {
      this.apiCitasService.getAgendaCitasVeterinariosList().subscribe(
        response => {
          this.agendaCitasVeterinarios = response.filter((cita: { tipoCita: { nombre: any; }; }) => cita.tipoCita.nombre === this.citaSeleccionada.nombre);
          console.log('Agenda de citas de veterinarios:', response);
          console.log('Agenda de citas de veterinarios:', this.agendaCitasVeterinarios);
        },
        error => {
          console.error('Error al obtener la agenda de citas de veterinarios:', error);
        }
      );
    }
  }

  agendarCita(agenda: IAgendaCitasVeterinarios): void {
    if (!this.mascotaSeleccionada || !this.citaSeleccionada) {
      console.log('Falta seleccionar datos');
      return;
    }
  
    const nuevaCita = {
      estado_cita: 'Asignada',
      fecha_hora: agenda.fecha + ' ' + agenda.hora,
      mascota: {
        id: this.mascotaSeleccionada.id
      },
      sedeCita: {
        id: agenda.sedeCita.id
      },
      veterinario: {
        identificacion: agenda.veterinario.identificacion
      },
      tipoCita: {
        id: this.citaSeleccionada.id
      }
    };
  
    this.apiCitasService.createCita(nuevaCita).subscribe(
      response => {
        console.log('Cita creada exitosamente:', response);
        this.router.navigate(['/']); 
      },
      error => {
        console.error('Error al crear la cita:', error);
      }
    );
  }
}
