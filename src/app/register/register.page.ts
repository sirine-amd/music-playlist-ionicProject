import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/authService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  async register() {
    if (this.registerForm.valid) {
      const { fullName, email, password, age } = this.registerForm.value;

      // Call the addUser method in AuthService
      this.authService.addUser(fullName, email, password, age).subscribe(
        async (response) => {
          // Show success toast when registration is successful
          const successToast = await this.toastCtrl.create({
            message: 'Registration successful!',
            duration: 2000,
            color: 'success',
          });
          await successToast.present();

          // Navigate the user to the login page after successful registration
          this.router.navigate(['/login']);
        },
        async (Error) => {
          // Show error toast in case of registration failure
          const errorToast = await this.toastCtrl.create({
            message: 'Registration failed! Please try again.',
            duration: 2000,
            color: 'danger',
          });
          await errorToast.present();
        }
      );
    } else {
      // Handle form validation errors if the form is invalid
      const invalidToast = await this.toastCtrl.create({
        message:
          'Please fill out all required fields and ensure the data is valid.',
        duration: 2000,
        color: 'danger',
      });
      await invalidToast.present();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
