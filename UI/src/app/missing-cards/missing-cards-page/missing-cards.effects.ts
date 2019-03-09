import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { internalApiGet } from '../../util/http';
import { surroundWithLoadingActions } from '../../app.actions';
import { MissingCardsPageDto } from './missing-cards.state';
import { MissingCardsActionTypes, InitializedMissingCardsPageAction } from './missing-cards.actions';
import { LoadInventoryAction } from './inventory';

@Injectable()
export class MissingCardsPageEffects {

  @Effect()
  loadPageData$: Observable<Action> = this.actions$
    .pipe(
      ofType(MissingCardsActionTypes.Load),
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
