import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/userProfile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any = {
    age: null,
    email: '',
    fullName: '',
    photoUrl: '',
  };

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userProfileService.getUserProfile().subscribe((profile) => {
      if (profile) {
        this.userProfile = profile;
        // Initialize the photo URL using the user's ID
        const userId = localStorage.getItem('userId');
        if (userId) {
          this.userProfile.photoUrl =
            this.userProfileService.getPhotoUrl(userId);
        }
      } else {
        console.error('No user profile found');
      }
    });
  }

  onFileChange(event: any) {
    console.log('on file change');

    const file = event.target.files[0];
    if (file) {
      this.userProfileService.uploadPhoto(file).subscribe((response: any) => {
        // After uploading, update the user's photo URL
        this.userProfile.photoUrl = this.userProfileService.getPhotoUrl(
          localStorage.getItem('userId')!
        );
      });
    }
  }

  updateProfile() {
    console.log('update profile');
    this.userProfileService
      .updateUserProfile(this.userProfile)
      .subscribe((response) => {
        console.log('Profile updated successfully', response);
      });
  }
}
