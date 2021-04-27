import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonTabBar } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomeRouter } from './home-routing.module';
import { Component } from '@angular/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRouter
  ],
  declarations: [HomePage],
})
export class HomePageModule {}




