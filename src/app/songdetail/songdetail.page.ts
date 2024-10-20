import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private alertController: AlertController,
    private router: Router

  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.songId = params.get('id'); // Assuming 'id' is the parameter name in the route
      if (this.songId) {
        this.loadSongDetails(this.songId); // Load the song details
      }
    });

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
            this.router.navigateByUrl('/tabs/playlist');
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
    // Navigate to AddSong page with the song ID for editing
    this.router.navigate(['/updatesong', this.songId]);
  }
}
