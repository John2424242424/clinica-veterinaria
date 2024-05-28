import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';


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
  selector: 'app-consultar-mascota',
  templateUrl: './consultar-mascota.component.html',
  styleUrls: ['./consultar-mascota.component.css']
})
export class ConsultarMascotaComponent implements OnInit{

  mascotas: IMascota[] = [];
  identificacionCliente!: string;

  constructor( private apiService: ApiServiceService ) { }


  ngOnInit(): void { 
    this.identificacionCliente = this.getIdentificacionCliente();
    this.getMascotas();
  }

  getIdentificacionCliente(): string {
    this.identificacionCliente = '19283921'; // Aquí deberías obtener la identificación del cliente que está logueado 
    return this.identificacionCliente;
  }

  getMascotas(): void {
    this.apiService.getMascotasList().subscribe(
      (mascotas: IMascota[]) => {
        this.mascotas = mascotas.filter(mascota => mascota.cliente && mascota.cliente.identificacion === this.identificacionCliente);
      },
      (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    );
  }


  editarMascota(id: number): void {

  }

  borrarMascota(id: number): void {
    this.apiService.deleteMascota(id).subscribe(
      (response) => {
        console.log('Mascota eliminada:', response);
        this.getMascotas();
      },
      (error) => {
        console.error('Error al eliminar la mascota:', error);
      }
    );
  }
}
