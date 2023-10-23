import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestartPassPageRoutingModule } from './restart-pass-routing.module';

import { RestartPassPage } from './restart-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestartPassPageRoutingModule
  ],
  declarations: [RestartPassPage]
})
export class RestartPassPageModule {}
