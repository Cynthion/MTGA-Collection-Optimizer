import { Routes } from '@angular/router';

const MISSING_CARDS_PATH = 'missing-cards';

export const appRoutes: Routes = [
  {
    path: '',
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
