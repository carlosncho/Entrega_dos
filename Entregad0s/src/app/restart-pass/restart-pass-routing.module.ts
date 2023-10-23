import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestartPassPage } from './restart-pass.page';

const routes: Routes = [
  {
    path: '',
    component: RestartPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestartPassPageRoutingModule {}
