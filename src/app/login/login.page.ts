import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup; // Using FormGroup for reactive forms

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {
    // Initialize the form with validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Built-in email validator
      password: ['', Validators.required],
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  login() {
    if (this.loginForm.invalid) {
      this.showToast('Please enter valid credentials.');
      return; // Prevent login if form is invalid
    }

    const { email, password } = this.loginForm.value; // Get email and password from form

    this.authService.authenticate(email, password).subscribe(
      (userData) => {
        if (userData) {
          console.log('Login successful', userData);
          this.router.navigate(['/playlist']);
        } else {
          console.error('Login failed: Invalid credentials');
          this.showToast('Login failed: Invalid credentials');
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.showToast('Login failed. Please try again.');
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  clearEmailError() {
    // Clear email error (if needed)
  }

  clearPasswordError() {
    // Clear password error (if needed)
  }
}
