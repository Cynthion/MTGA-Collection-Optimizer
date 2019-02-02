import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import { first, map } from 'rxjs/operators';

import { LoadMissingCardsPageAction, MissingCardsActionTypes } from './missing-cards.actions';

@Injectable()
export class MissingCardsPageInitializationGuard implements CanActivate {
  constructor(private actionsSubject: ActionsSubject) { }

  canActivate(route: ActivatedRouteSnapshot) {
    this.actionsSubject.next(new LoadMissingCardsPageAction());
    return this.actionsSubject.pipe(
      first(a => a.type === MissingCardsActionTypes.Initialized),
      map(() => true),
    );
  }
}
