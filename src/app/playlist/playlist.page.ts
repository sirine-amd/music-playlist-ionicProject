import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { Song } from '../models/song.model';
import { SongResponse } from '../models/song.response';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})

export class PlaylistPage implements OnInit {

  songs: Song[] = [];

  constructor(private playlistService: PlaylistService, private alertController: AlertController) { }

  getSongs() {
    this.songs=[];
    this.playlistService.getAllSongs().subscribe({
      next: (response: SongResponse) => {
        
        console.log(response);
        for (const key in response) {
          console.log("responde: " + response)
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

  // Method to present an alert for deletion
async presentAlert(songId: string) {
  const alert = await this.alertController.create({
    header: 'Confirm Deletion',
    message: 'Are you sure you want to delete this song?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Cancel clicked');
        },
      },
      {
        text: 'Delete',
        handler: () => {
          this.deleteSong(songId); // Call your delete method here
        },
      },
    ],
  });

  await alert.present();
}

// Method to delete the song
deleteSong(songId: string) {
  console.log("id"+ songId);
  this.playlistService.deleteSong(songId).subscribe({
    next: (response) => {
      console.log('after delete' +response);
     
      this.getSongs();
    },
    error: (err) => {
      console.error('Error deleting song:', err);
    },
  });
}

  ngOnInit() {
    this.getSongs();
  }

  
}
