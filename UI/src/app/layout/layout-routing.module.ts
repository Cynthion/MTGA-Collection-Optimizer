import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutInitializationGuard } from './layout.guard';
import { LayoutComponent } from './layout.component';

export const routes: Routes = [
  {
    path: 'layout',
    canActivate: [LayoutInitializationGuard],
    component: LayoutComponent,
    // router displays the components of these routes in the RouterOutlet of the LayoutComponent,
    // not in the RouterOutlet of the AppComponent shell
    children: [
      {
        path: 'decks-tab',
        loadChildren: () => import('./tabs/decks-tab/decks-tab.module').then(mod => mod.DecksTabModule)
      },
      {
        path: '**',
        redirectTo: 'decks-tab',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
