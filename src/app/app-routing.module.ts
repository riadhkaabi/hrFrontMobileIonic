import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Services/authguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'options',
    loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule)

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup/:token',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'conge',
    loadChildren: () => import('./conge/conge.module').then( m => m.CongePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'users-list',
    loadChildren: () => import('./users-list/users-list.module').then( m => m.UsersListPageModule),canActivate:[AuthGuard]
    
  },
  {
    path: 'messages/:uid',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'messages-list',
    loadChildren: () => import('./messages-list/messages-list.module').then( m => m.MessagesListPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'add-picture/:userId',
    loadChildren: () => import('./add-picture/add-picture.module').then( m => m.AddPicturePageModule)
  },
  {
    path: 'attendance-users',
    loadChildren: () => import('./attendance-users/attendance-users.module').then( m => m.AttendanceUsersPageModule),canActivate:[AuthGuard]
   },
  {
    path: 'attendance/:id',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'expandable',
    loadChildren: () => import('./expandable/expandable.module').then( m => m.ExpandablePageModule)
  },
 
  {
    path: 'qrattendance',
    loadChildren: () => import('./qrattendance/qrattendance.module').then( m => m.QrattendancePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
