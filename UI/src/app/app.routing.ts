import { Routes } from '@angular/router';

import { AppGuard } from './app.guard';
import { MissingCardsPageComponent } from './missing-cards/missing-cards-page';

const MISSING_CARDS_PATH = 'missing-cards';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    children: [
      {
        path: MISSING_CARDS_PATH,
        component: MissingCardsPageComponent,
      },
      {
        path: '**',
        redirectTo: MISSING_CARDS_PATH,
      },
    ],
  },
];
