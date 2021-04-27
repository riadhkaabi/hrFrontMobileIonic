import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceUsersPageRoutingModule } from './attendance-users-routing.module';

import { AttendanceUsersPage } from './attendance-users.page';
import { ExpandablePage } from '../expandable/expandable.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceUsersPageRoutingModule
  ],
  declarations: [AttendanceUsersPage,ExpandablePage]
})
export class AttendanceUsersPageModule {}
