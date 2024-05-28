import { Component, OnInit } from '@angular/core';
import { ApiCitasServiceService } from 'src/app/services/api-citas-service.service';

interface ICita{
  mascota: IMascota,
  fecha_hora: string,
  tipoCita: ITipoCita,
  sedeCita: ISedeCita,
  veterinario: IVeterinario,
  estado_cita: string
}

interface IMascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
}

interface ITipoCita {
  id: number;
  nombre: string;
}

interface ISedeCita {
  id: number;
  nombre: string;
}

interface IVeterinario {
  identificacion: number;
  nombres: string;
  apellidos: string;
}


@Component({
  selector: 'app-consultar-citas',
  templateUrl: './consultar-citas.component.html',
  styleUrls: ['./consultar-citas.component.css']
})
export class ConsultarCitasComponent implements OnInit {

  citas: ICita[] = [];

  constructor(private apiCitasService: ApiCitasServiceService) { }

  ngOnInit(): void {
    this.agendarCita();
  }

  agendarCita(){
    this.apiCitasService.getCitasList().subscribe(data => {
      this.citas = data;
      console.log(this.citas);
    });
  }
}
