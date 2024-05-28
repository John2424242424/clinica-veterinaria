import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/api-auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful:', response);
        // Aquí puedes almacenar el token y redirigir al usuario a otra página
        localStorage.setItem('token', response.token);
      },
      error => {
        console.error('Login failed:', error);
        this.errorMessage = 'Email o contraseña incorrectos';
      }
    );
  }
}
