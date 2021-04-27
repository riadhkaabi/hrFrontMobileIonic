import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CongePage } from './conge.page';

const routes: Routes = [
  {
    path: '',
    component: CongePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CongePageRoutingModule {}
