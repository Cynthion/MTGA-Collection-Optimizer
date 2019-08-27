import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryTabComponent } from './history-tab.component';

export const routes: Routes = [
  {
    path: '',
    component: HistoryTabComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryTabRoutingModule { }
