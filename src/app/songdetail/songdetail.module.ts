import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SongdetailPageRoutingModule } from './songdetail-routing.module';

import { SongdetailPage } from './songdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongdetailPageRoutingModule
  ],
  declarations: [SongdetailPage]
})
export class SongdetailPageModule {}
