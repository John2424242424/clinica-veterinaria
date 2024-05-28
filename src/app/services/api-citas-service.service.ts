import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCitasServiceService {

  private baseUrlCitas = 'http://localhost:8086/api/citas';
  private baseUrlAgendaCitasVeterinarios = 'http://localhost:8094/api/agendar-cita-veterinarios';
  private baseUrlMascotas = 'http://localhost:8085/api/mascotas';
  private baseUrlTipoCitas = 'http://localhost:8090/api/tipo-citas';

  constructor(private http: HttpClient) { }

  getCitasList(): Observable<any> {
    return this.http.get(`${this.baseUrlCitas}`);
  }

  getCitaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrlCitas}/${id}`);
  }

  createCita(citaData: any): Observable<any> {
    return this.http.post<any>(this.baseUrlCitas, citaData);
  }

  updateCita(id: number, citaData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrlCitas}/${id}`, citaData);
  }

  deleteCita(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrlCitas}/${id}`);
  }

  getAgendaCitasVeterinariosList(): Observable<any> {
    return this.http.get(`${this.baseUrlAgendaCitasVeterinarios}`);
  }

  getMascotasList(): Observable<any> {
    return this.http.get(`${this.baseUrlMascotas}`);
  }

  getTipoCitasList(): Observable<any> {
    return this.http.get(`${this.baseUrlTipoCitas}`);
  }

}
