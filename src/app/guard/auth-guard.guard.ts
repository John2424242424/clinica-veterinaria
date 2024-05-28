import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      // El usuario no está autenticado, redirigir al componente de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
