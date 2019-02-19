import { Routes } from '@angular/router';
import { AppGuard } from './app.guard';

const MISSING_CARDS_PATH = 'missing-cards';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    children: [
      {
        path: MISSING_CARDS_PATH,
        loadChildren: './missing-cards/missing-cards.module#MissingCardsModule',
      },
      {
        path: '**',
        redirectTo: MISSING_CARDS_PATH,
      },
    ],
  },
];
