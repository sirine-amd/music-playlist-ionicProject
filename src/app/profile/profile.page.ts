import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/userProfile.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';

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
  image: any;

  constructor(
    private userProfileService: UserProfileService,
    private firestore: Firestore
  ) //private storage: Storage
  {}
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

  // add photo
  async takePicture() {
    try {
      if (Capacitor.getPlatform() != 'web') await Camera.requestPermissions();
      const image = await Camera.getPhoto({
        quality: 90,
        // allowEditing: false,
        source: CameraSource.Prompt,
        width: 600,
        resultType: CameraResultType.DataUrl,
      });
      console.log('image: ', image);
      this.image = image.dataUrl;
      const blob = this.dataURLtoBlob(image.dataUrl);
      /**    const url = await this.uploadImage(blob, image);
      console.log(url);
      const response = await this.addDocument('test', { imageUrl: url });
      console.log(response);**/
    } catch (e) {
      console.log(e);
    }
  }

  dataURLtoBlob(dataurl: any) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  /**async uploadImage(blob: any, imageData: any) {
    try {
      const currentDate = Date.now();
      const filePath = `test/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filePath);
      const task = await uploadBytes(fileRef, blob);
      console.log('task: ', task);
      const url = getDownloadURL(fileRef);
      return url;
    } catch (e) {
      throw e;
    }
  }
**/
  addDocument(path: any, data: any) {
    const dataRef = collection(this.firestore, path);
    return addDoc(dataRef, data);
  }
}
