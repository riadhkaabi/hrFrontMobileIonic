import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrattendancePageRoutingModule } from './qrattendance-routing.module';

import { QrattendancePage } from './qrattendance.page';
import {NgxQRCodeModule} from 'ngx-qrcode2'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrattendancePageRoutingModule,NgxQRCodeModule
  ],
  declarations: [QrattendancePage]
})
export class QrattendancePageModule {}
