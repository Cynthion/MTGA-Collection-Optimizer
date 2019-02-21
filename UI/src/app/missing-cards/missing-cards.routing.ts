import { Route } from '@angular/router';

import { MissingCardsPageComponent, MissingCardsPageInitializationGuard } from './missing-cards-page';

export const missingCardsRoutes: Route[] = [
  {
    path: '',
    component: MissingCardsPageComponent,
    canActivate: [MissingCardsPageInitializationGuard]
  },
];
