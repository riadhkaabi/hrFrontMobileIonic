import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrattendancePage } from './qrattendance.page';

const routes: Routes = [
  {
    path: '',
    component: QrattendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrattendancePageRoutingModule {}
