import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { surroundWithLoadingActions } from '../app.actions';
import { internalApiGet } from '../util/http';
import { LayoutActionTypes, InitializeLayoutAction, CalculateCollectionCardsAction } from './layout.actions';
import { LayoutDto } from './layout.state';

@Injectable()
export class LayoutEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .pipe(
      ofType(LayoutActionTypes.LoadData),
      tap(a => console.log(a)),
      flatMap(_ =>
        surroundWithLoadingActions(
          internalApiGet<LayoutDto>(
            this.http,
            'missingcards', // TODO rename on backend
            dto => [
              new InitializeLayoutAction(dto),
              new CalculateCollectionCardsAction(),
            ]
          )
        )),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
