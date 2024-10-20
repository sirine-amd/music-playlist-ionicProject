import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  constructor(private http: HttpClient) {}

  signIn(email: string, password: string, apiKey: string): Observable<any> {
    return this.http.post(`${this.apiUrl}signInWithPassword?key=${apiKey}`, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  signOut() {
    // Implement sign-out logic if needed (Firebase token management)
  }
}
