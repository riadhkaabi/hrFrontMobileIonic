import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import {Deeplinks} from '@ionic-native/deeplinks/ngx'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  declarations: [SignupPage],
})
export class SignupPageModule {}
