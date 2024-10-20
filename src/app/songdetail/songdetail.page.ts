import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';
import { Song } from '../models/song.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-songdetail',
  templateUrl: './songdetail.page.html',
  styleUrls: ['./songdetail.page.scss'],
})
export class SongdetailPage implements OnInit {
  song: Song | undefined;
  songId :any;
  defaultImageUrl: string = 'assets/image detail.png'; // Default image

  constructor(
    private songService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit() {
     this.songId = this.activatedRoute.snapshot.paramMap.get('id')
    if ( this.songId) {
      this.loadSongDetails( this.songId);
    }
  }

  loadSongDetails(id: string) {
    this.songService.getSongById(id).subscribe((response: Song) => {
      this.song = response;
    });
  }

  async presentAlert() {
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
            this.deleteSong( this.songId); // Call your delete method here
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  // Method to delete the song
  deleteSong(songId: string) {
    console.log("id"+ songId);
    this.songService.deleteSong(songId).subscribe({
      next: (response) => {
        console.log('after delete' +response);

      },
      error: (err) => {
        console.error('Error deleting song:', err);
      },
    });
  }
  

  editSong() {
    console.log("edit")
  }
}
