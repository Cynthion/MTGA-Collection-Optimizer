import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import { first, map } from 'rxjs/operators';

import { LoadDataAction, LayoutActionTypes } from './layout.actions';

@Injectable()
export class LayoutInitializationGuard implements CanActivate {
  constructor(private actionsSubject: ActionsSubject) { }

  canActivate(route: ActivatedRouteSnapshot) {
    this.actionsSubject.next(new LoadDataAction());
    return this.actionsSubject.pipe(
      first(a => a.type === LayoutActionTypes.Initialize),
      map(() => true),
    );
  }
}
