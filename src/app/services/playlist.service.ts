import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SongResponse } from '../models/song.response';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = 'https://playlist-63eea-default-rtdb.firebaseio.com/songs/';

  constructor(private http: HttpClient) {}

  getPlaylist(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${userId}/songs.json`);
  }

  getAllSongs(): Observable<SongResponse> {
    return this.http.get<SongResponse>('https://playlist-63eea-default-rtdb.firebaseio.com/songs.json');
  }

  addSong(song: any){ 
    return this.http.post(
      'https://playlist-63eea-default-rtdb.firebaseio.com/songs.json',
      song
    );
  }

  deleteSong(songid:string){
    return this.http.delete(
      `https://playlist-63eea-default-rtdb.firebaseio.com/songs/${songid}.json`
    );
  }
}
