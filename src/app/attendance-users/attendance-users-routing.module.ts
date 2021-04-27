import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendanceUsersPage } from './attendance-users.page';

const routes: Routes = [
  {
    path: '',
    component: AttendanceUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceUsersPageRoutingModule {}
