import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { MissingCardsActionTypes, InitializedMissingCardsPageAction, LoadMissingCardsPageErrorAction } from './missing-cards.actions';
import { mergeMap, catchError, flatMap, tap } from 'rxjs/operators';
import { MissingCardsPageDto } from './missing-cards.state';
import { internalApiGet } from 'src/app/util/http';

@Injectable()
export class MissingCardsPageEffects {

  @Effect()
  loadPageData$: Observable<Action> = this.actions$
  .pipe(
      ofType(MissingCardsActionTypes.Load),
      flatMap(a =>
        internalApiGet<MissingCardsPageDto>(
          this.http,
          'missingcards',
          dto => [new InitializedMissingCardsPageAction(dto)]
        )
      ),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
