import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserProfile } from '../models/UserProfile';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'https://playlist-63eea-default-rtdb.firebaseio.com/Users';

  private imageBaseUrl = 'https://playlist-63eea.appspot.com/images'; // Base URL for images

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile | null> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return of(null);
    }

    return this.http.get<UserProfile>(`${this.apiUrl}/${userId}.json`).pipe(
      catchError((error) => {
        console.error('Error fetching user data', error);
        return of(null);
      })
    );
  }

  updateUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    return this.http.put<UserProfile>(
      `${this.apiUrl}/profile/${userId}`,
      userProfile
    ); // Update user profile by ID
  }

  uploadPhoto(photo: File): Observable<any> {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    const formData = new FormData();
    formData.append('photo', photo);

    // Use your image upload endpoint here
    return this.http
      .post(`${this.imageBaseUrl}/${userId}.json`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          // Handle the upload progress
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(
              (100 * event.loaded) / (event.total || 1)
            );
            console.log(`File is ${percentDone}% uploaded.`);
          } else if (event instanceof HttpResponse) {
            // Successfully uploaded
            console.log('Upload complete');
          }
          return event;
        }),
        catchError((error) => {
          console.error('Error uploading photo', error);
          return of(null); // Handle errors appropriately
        })
      );
  }

  getPhotoUrl(userId: string): string {
    return `${this.imageBaseUrl}${userId}.jpg`; // Construct the URL for the user's photo
  }
}
