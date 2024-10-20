import { Component } from '@angular/core';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './addsong.page.html',
  styleUrls: ['./addsong.page.scss'],
})
export class AddSongPage {
  constructor(private playlistService: PlaylistService) {}

  onSubmit(formValue: { titre: string; artiste: string; catégorie?: string; réaliser: string }) {
    const newSong = {
      titre: formValue.titre,
      artiste: formValue.artiste,
      catégorie: formValue.catégorie || 'Choose a Category', // Default value if not provided
      réaliser: formValue.réaliser, // Convert date to ISO format if needed
      // Include userId if necessary
      // userId: 'someUserId', // Uncomment and set this if needed
    };

    this.playlistService.addSong(newSong).subscribe({
      next: (response) => {
        console.log('Song :', newSong);

        console.log('Song added:', response);
        // Handle success, e.g., navigate back or show a success message
      },
      error: (err) => {
        console.error('Error adding song:', err);
        // Handle error, e.g., show an error message
      },
    });
  }
}

