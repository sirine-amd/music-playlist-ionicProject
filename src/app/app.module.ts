import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
// Import Firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({}),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase App
    AngularFirestoreModule, // Firestore module
    AngularFireStorageModule, // Firebase Storage module
    ReactiveFormsModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'playlist-63eea',
        appId: '1:727183512675:web:109e2550b0a913f42b5456',
        databaseURL: 'https://playlist-63eea-default-rtdb.firebaseio.com',
        storageBucket: 'playlist-63eea.appspot.com',
        apiKey: 'AIzaSyCj7-U136fv5aVNtMKccuxPMTl3gclZh0I',
        authDomain: 'playlist-63eea.firebaseapp.com',
        messagingSenderId: '727183512675',
        measurementId: 'G-NSYWHSJ1P4',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
