import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private databaseUrl =
    'https://playlist-63eea-default-rtdb.firebaseio.com/Users';

  constructor(private http: HttpClient) {}

  authenticate(email: string, fullname: string): Observable<any> {
    return this.http.get(`${this.databaseUrl}.json`).pipe(
      map((data: any) => {
        for (const id in data) {
          if (data[id].email === email && data[id].fullName === fullname) {
            return { id, ...data[id] };
          }
        }
        return null;
      }),
      catchError((error) => {
        console.error('Error fetching user data', error);
        return of(null);
      })
    );
  }

  addUser(fullName: string, email: string, password: string, age: number): Observable<any> {
    const newUser = {
      fullName,
      email,
      password,
      age
    };

    return this.http.post(`${this.databaseUrl}.json`, newUser).pipe(
      map((response: any) => {
        return { id: response.name, ...newUser };
      }),
      catchError((error) => {
        console.error('Error adding user', error);
        return of(null);
      })
    );
  }

  signOut() {}
}
