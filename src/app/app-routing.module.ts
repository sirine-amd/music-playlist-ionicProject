import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { TabsPageModule } from './tabs/tabs.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'playlist',
    loadChildren: () =>
      import('./playlist/playlist.module').then((m) => m.PlaylistPageModule),
  },
  {
    path: 'updatesong/:id',
    loadChildren: () =>
      import('./addsong/addsong.module').then((m) => m.AddsongPageModule),
  },
  {
    path: 'addsong',
    loadChildren: () =>
      import('./addsong/addsong.module').then((m) => m.AddsongPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'songdetail/:id',
    loadChildren: () => import('./songdetail/songdetail.module').then( m => m.SongdetailPageModule)
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'playlist',
        loadChildren: () =>
          import('./playlist/playlist.module').then(
            (m) => m.PlaylistPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
