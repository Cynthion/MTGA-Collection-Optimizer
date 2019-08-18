import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { surroundWithLoadingActions } from '../app.actions';
import { internalApiGet } from '../util/http';
import { LayoutActionTypes } from './layout.actions';

@Injectable()
export class LayoutEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .pipe(
      ofType(LayoutActionTypes.LoadData),
      tap(a => console.log(a)),
      flatMap(_ =>
        surroundWithLoadingActions(
          internalApiGet<MissingCardsPageDto>(
            this.http,
            'missingcards',
            dto => [
              new LoadInventoryAction(),
              new InitializedMissingCardsPageAction(dto),
            ]
          )
        )),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
