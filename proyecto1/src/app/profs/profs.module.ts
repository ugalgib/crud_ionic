import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfsPageRoutingModule } from './profs-routing.module';

import { ProfsPage } from './profs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfsPageRoutingModule
  ],
  declarations: [ProfsPage]
})
export class ProfsPageModule {}
