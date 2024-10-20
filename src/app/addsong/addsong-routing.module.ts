import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddsongPage } from './addsong.page';

const routes: Routes = [
  {
    path: '',
    component: AddsongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddsongPageRoutingModule {}
