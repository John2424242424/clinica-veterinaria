import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotaCreationData } from 'src/app/dominio/Mascotas';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css']
})
export class CrearMascotaComponent implements OnInit {

  mascotaForm!: FormGroup;
  identificacionCliente!: string;

  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.identificacionCliente = this.getIdentificacionCliente();
    this.mascotaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', Validators.required]
    });
  }

  getIdentificacionCliente(): string {
    this.identificacionCliente = '19283921'; // Aquí deberías obtener la identificación del cliente que está logueado 
    return this.identificacionCliente;
  }
  
  onSubmit(): void {
    if (this.mascotaForm.valid) {
      const mascotaDataForm = this.mascotaForm.value;
      const mascotaData: MascotaCreationData = {
        nombre: mascotaDataForm.nombre,
        especie: mascotaDataForm.especie,
        raza: mascotaDataForm.raza,
        edad: mascotaDataForm.edad,
        cliente: {
          identificacion: this.identificacionCliente
        }
      };

      this.apiService.createMascota(mascotaData).subscribe(
        response => {
          console.log('Mascota creada exitosamente:', response);
          this.router.navigate(['/']); 
        },
        error => {
          console.error('Error al crear la mascota:', error);
        }
      );
    }
  }
}
