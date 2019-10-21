import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecksTabComponent } from './decks-tab.component';

export const routes: Routes = [
  {
    path: '',
    component: DecksTabComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksTabRoutingModule { }
