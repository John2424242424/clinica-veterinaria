import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  navigateToLogin(){
    console.log('Navigating to login');
  }

  navigateToRegister(){
    
  }
}
