import { Route } from '@angular/router';

import { TabsComponent } from './tabs.component';
import { TabsInitializationGuard } from './tabs.guard';

export const tabsRoutes: Route[] = [
  {
    path: '',
    component: TabsComponent,
    canActivate: [TabsInitializationGuard]
  },
];
