import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Lógica para autenticar al usuario
    // Por ejemplo, verifica las credenciales con un servidor remoto
    if (username === 'usuario' && password === 'contraseña') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
