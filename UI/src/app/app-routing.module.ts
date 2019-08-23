import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { AppGuard } from './app.guard';

export const routes: Routes = [
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AppGuard],
  },
  {
    path: '**',
    redirectTo: 'layout',
  },
  // {
  //   path: '',
  //   canActivate: [AppGuard],
  //   children: [
  //     {
  //       path: LAYOUT_PATH,
  //       component: LayoutComponent,
  //     },
  //     {
  //       path: '**',
  //       redirectTo: LAYOUT_PATH,
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
