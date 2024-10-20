import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSongPage } from './addsong.page';

const routes: Routes = [
  {
    path: '',
    component: AddSongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsongPageRoutingModule {}
