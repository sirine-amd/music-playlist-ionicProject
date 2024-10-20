import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { AddsongPageRoutingModule } from './addsong-routing.module';

import { AddSongPage } from './addsong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddsongPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddSongPage]
})
export class AddsongPageModule {}
