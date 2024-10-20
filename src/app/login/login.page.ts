import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .signIn(this.email, this.password, 'YOUR_FIREBASE_API_KEY')
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          // Store the token or user information if necessary
          this.router.navigate(['/playlist']); // Navigate to the playlist page on successful login
        },
        (error) => {
          console.error('Login failed', error);
          // Optionally, show an error message to the user
        }
      );
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Navigate to registration page if needed
  }
}
