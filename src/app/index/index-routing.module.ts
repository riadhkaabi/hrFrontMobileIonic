import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index.page';

const routes: Routes = [
{
path: '',component: IndexPage,
children:[
//{path: 'login',loadChildren: () =>import('../login/login.module').then(m => m.LoginPageModule)},
//{path: 'signup',loadChildren: () =>import('../sign-up/sign-up.module').then(m => m.SignUpPageModule)},
//{path: 'home',loadChildren: () =>import('../home/home.module').then(m => m.HomePageModule)}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}