import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

import { DecksTabActionTypes, FilterValueChangedAction, FilterAction } from './decks-tab.actions';

@Injectable()
export class DecksTabEffects {

  @Effect()
  filterValueChanged$: Observable<Action> = this.actions$
    .pipe(
      ofType(DecksTabActionTypes.FilterValueChanged),
      map(a => a as FilterValueChangedAction),
      debounceTime(500),
      switchMap(a => [
        new FilterAction(a.filterValue),
      ]),
    );

  constructor(
    private actions$: Actions,
  ) { }
}
