import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutInitializationGuard } from './layout.guard';
import { LayoutComponent } from './layout.component';
import { DecksTabComponent } from './tabs/decks-tab/decks-tab.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [LayoutInitializationGuard],
    // router displays the components of these routes in the RouterOutlet of the LayoutComponent,
    // not in the RouterOutlet of the AppComponent shell
    children: [
      {
        path: 'decks-tab',
        // loadChildren: 'app/layout/tabs/decks-tab/decks-tab.module#DecksTabModule',
        component: DecksTabComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
