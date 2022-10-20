import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfsPage } from './profs.page';

const routes: Routes = [
  {
    path: '',
    component: ProfsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfsPageRoutingModule {}
