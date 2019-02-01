import { Routes } from '@angular/router';

import { AppGuard } from './app.guard';
import { MISSING_CARDS_MODULE_PATH } from '../shared/routing';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: MISSING_CARDS_MODULE_PATH,
        loadChildren: 'app/missing-cards/missing-cards.module#MissingCardsModule',
      },
      {
        path: '**',
        redirectTo: MISSING_CARDS_MODULE_PATH,
      },
    ],
  },
];
