import { Routes } from '@angular/router';

import { AppGuard } from './app.guard';
import { LayoutComponent } from './layout/layout.component';

const LAYOUT_PATH = 'layout';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    children: [
      {
        path: LAYOUT_PATH,
        component: LayoutComponent,
      },
      {
        path: '**',
        redirectTo: LAYOUT_PATH,
      },
    ],
  },
];
