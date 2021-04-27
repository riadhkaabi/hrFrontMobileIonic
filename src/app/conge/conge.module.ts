import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CongePageRoutingModule } from './conge-routing.module';

import { CongePage } from './conge.page';
import { ExpandablePage } from "../expandable/expandable.page";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CongePageRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [CongePage,ExpandablePage]
})
export class CongePageModule {}
