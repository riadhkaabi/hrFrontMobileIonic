import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../Services/authguard.service';
import { HomePage } from './home.page';

const routes: Routes = [
{
path: '',component: HomePage,
children: [
{path: '',loadChildren: () =>import('../dashboard/dashboard.module').then(m => m.DashboardPageModule),canActivate:[AuthGuard]},
{path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule),canActivate:[AuthGuard]},
{path: 'conge', loadChildren: () => import('../conge/conge.module').then( m => m.CongePageModule),canActivate:[AuthGuard]},
{path: 'attendance-users', loadChildren: () => import('../attendance-users/attendance-users.module').then( m => m.AttendanceUsersPageModule),canActivate:[AuthGuard]},
{path: 'users-list',loadChildren: () =>import('../users-list/users-list.module').then(m => m.UsersListPageModule),canActivate:[AuthGuard]}
]
}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class HomeRouter {}