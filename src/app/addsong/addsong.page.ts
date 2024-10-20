import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';
import { Song } from '../models/song.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-song',
  templateUrl: './addsong.page.html',
  styleUrls: ['./addsong.page.scss'],
})
export class AddSongPage implements OnInit {
  songForm: FormGroup;
  songId: string | null = null; // Store song ID if available
  isEditMode: boolean = false; // Determine if we're in edit mode

  constructor(
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastController: ToastController // Inject ToastController
  ) {
    // Initialize the form with empty/default values
    this.songForm = this.formBuilder.group({
      titre: ['', Validators.required],
      artiste: ['', Validators.required],
      catégorie: ['Choose a Category'], // You can set a default category here if needed
      réaliser: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Get song ID from route parameters if editing
    this.songId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.songId) {
      this.isEditMode = true; // We're editing an existing song
      this.loadSongDetails(this.songId);
    }
  }

  // Load the song details if editing
  loadSongDetails(id: string) {
    console.log("id: ", id);
    this.playlistService.getSongById(id).subscribe((song: Song) => {
      console.log("Editing song: ", song);
      if (song) {
        this.songForm.patchValue({
          titre: song.titre,
          artiste: song.artiste,
          catégorie: song.catégorie || '', // Provide a fallback if catégorie is undefined
          réaliser: song.réaliser,
        });
      }
    });
  }
  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: color, // You can customize color based on success or error
    });
    await toast.present();
  }
  // Handle form submission
  onSubmit() {
    if (this.songForm.valid) {
      const formValue = this.songForm.value; // Get the current form value
      const newSong = {
        titre: formValue.titre,
        artiste: formValue.artiste,
        catégorie: formValue.catégorie || 'Choose a Category',
        réaliser: formValue.réaliser,
      };

      if (this.isEditMode && this.songId) {
        const updateSong = {
          titre: formValue.titre,
          artiste: formValue.artiste,
          catégorie: formValue.catégorie || 'Choose a Category',
          réaliser: formValue.réaliser,
        };
        // If editing, update the song
        this.playlistService.updateSong(this.songId, updateSong).subscribe({
          next: (response) => {
            console.log('Song updated:', response);
            this.showToast('Song updated successfully!', 'success'); // Show success toast
          },
          error: (err) => {
            console.error('Error updating song:', err);
            this.showToast('Error updating song. Please try again.'); // Show error toast
          },
        });
      } else {
        // If adding a new song
        this.playlistService.addSong(newSong).subscribe({
          next: (response) => {
            console.log('Song added:', response);
             // Add a delay before navigating back to the playlist
          setTimeout(() => {
            this.songForm.reset();
            this.router.navigateByUrl('/tabs/playlist');
          }, 2000); // Delay in milliseconds (2000 ms = 2 seconds)
          },
          error: (err) => {
            console.error('Error adding song:', err);
          },
        });
      }
    }
  }
}
