import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { Song } from '../models/song.model';
import { SongResponse } from '../models/song.response';



@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})

export class PlaylistPage implements OnInit {

  songs: Song[] = [];

  constructor(private playlistService: PlaylistService) { }

  getSongs() {
    this.playlistService.getAllSongs().subscribe({
      next: (response: SongResponse) => {
        console.log(response);
        for (const key in response) {
        if (response.hasOwnProperty(key)) {
          // Destructure the response[key] to omit 'id'
          const { id, ...rest } = response[key]; // Extract 'id' and store the rest
          
          // Create a new song object with the 'id' from key
          const song: Song = { 
            id: key, 
            ...rest, // Spread the remaining properties
          };
          this.songs.push(song);
        }
      }
        console.log(this.songs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.getSongs();
  }

  
}
