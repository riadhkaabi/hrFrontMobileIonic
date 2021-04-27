import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ExpandableComponent } from "./expandable.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [ExpandableComponent]
})
export class ExpandableComponentModule {}
