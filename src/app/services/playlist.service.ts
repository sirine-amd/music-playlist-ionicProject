import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'https://your-project-id.firebaseio.com/playlists/';

  constructor(private http: HttpClient) {}

  getPlaylist(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${userId}/songs.json`);
  }

  addSong(userId: string, song: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${userId}/songs.json`, song);
  }

  deleteSong(userId: string, songId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${userId}/songs/${songId}.json`);
  }
}
