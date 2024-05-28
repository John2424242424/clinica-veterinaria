import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaCreationData } from 'src/app/dominio/Mascotas';
import { ApiServiceService } from 'src/app/services/api-service.service';

interface IMascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  cliente: ICliente | null;
}

interface ICliente {
  identificacion: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  email: string;
}


@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent implements OnInit{

  mascotaForm!: FormGroup;
  mascotaId!: number;
  mascotas: IMascota[] = [];
  identificacionCliente!: string;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.identificacionCliente = this.getIdentificacionCliente();
    this.mascotaForm = this.fb.group({
      nombre: [''],
      especie: [''],
      raza: [''],
      edad: [''],
      cliente: {
        identificacion: this.identificacionCliente
      }
    });

    this.route.paramMap.subscribe(params => {
      this.mascotaId = +params.get('id')!;
      this.getMascota();
    });

    this.getMascotas();
  }

  getMascota(): void {
    this.apiService.getMascotaById(this.mascotaId).subscribe(
      data => this.mascotaForm.patchValue(data),
      error => console.error('Error al obtener la mascota:', error)
    );
  }

  getMascotas(): void {
    this.apiService.getMascotasList().subscribe(
      (mascotas: IMascota[]) => {
        this.mascotas = mascotas.filter(mascota => mascota.cliente?.identificacion === this.getIdentificacionCliente());
      },
      (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    );
  }

  getIdentificacionCliente(): string {
    this.identificacionCliente = '19283921'; // Aquí deberías obtener la identificación del cliente que está logueado 
    return this.identificacionCliente;
  }

  onSubmit(): void {
    this.apiService.updateMascota(this.mascotaId, this.mascotaForm.value).subscribe(
      () => this.router.navigate(['consultar-mascotas']),
      error => console.error('Error al actualizar la mascota:', error)
    );
  }

  cancel(): void {
    this.router.navigate(['consultar-mascotas']);
  }
}
