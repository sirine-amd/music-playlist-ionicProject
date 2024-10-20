import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SongdetailPage } from './songdetail.page';

const routes: Routes = [
  {
    path: '',
    component: SongdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongdetailPageRoutingModule {}
