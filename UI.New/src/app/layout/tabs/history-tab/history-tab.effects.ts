import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, debounceTime, switchMap } from 'rxjs/operators';

import { HistoryTabActionTypes, FilterValueChangedAction, FilterAction } from './history-tab.actions';

@Injectable()
export class HistoryTabEffects {

  @Effect()
  filterValueChanged$: Observable<Action> = this.actions$
    .pipe(
      ofType(HistoryTabActionTypes.FilterValueChanged),
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
