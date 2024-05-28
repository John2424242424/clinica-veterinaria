import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MascotaCreationData } from '../dominio/Mascotas';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl = 'http://localhost:8085/api/mascotas';

  constructor( private http: HttpClient ) { }

  getMascotasList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getMascotaById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createMascota(mascotaData: MascotaCreationData): Observable<any> {
    return this.http.post<any>(this.baseUrl, mascotaData);
  }

  updateMascota(id: number, mascotaData: MascotaCreationData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, mascotaData);
  }

  deleteMascota(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
