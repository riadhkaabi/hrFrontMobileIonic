import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsPage } from './options.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsPage,
    children:[
      {path: '',loadChildren: () =>import('../home/home.module').then(m => m.HomePageModule)},
      {path: 'home',loadChildren: () =>import('../home/home.module').then(m => m.HomePageModule)},
      {path: 'messages-list',loadChildren: () =>import('../messages-list/messages-list.module').then(m => m.MessagesListPageModule)},
      {path: 'notifications',loadChildren: () =>import('../notifications/notifications.module').then(m => m.NotificationsPageModule)},
      {path: 'qr',loadChildren: () =>import('../qrattendance/qrattendance.module').then(m => m.QrattendancePageModule)},
      {path: 'profile',loadChildren: () =>import('../profile/profile.module').then(m => m.ProfilePageModule)},
      {path: 'holiday',loadChildren: () =>import('../conge/conge.module').then(m => m.CongePageModule)},



    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsPageRoutingModule {}
