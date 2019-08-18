import { Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LayoutInitializationGuard } from './layout.guard';

export const layoutRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [LayoutInitializationGuard]
  },
];
