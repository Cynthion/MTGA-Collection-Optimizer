import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { MissingCardsActionTypes, InitializedMissingCardsPageAction, LoadMissingCardsPageErrorAction } from './missing-cards.actions';
import { flatMap } from 'rxjs/operators';
import { MissingCardsPageDto } from './missing-cards.state';
import { internalApiGet } from 'src/app/util/http';
import { LoadInventoryAction } from './inventory';

@Injectable()
export class MissingCardsPageEffects {

  @Effect()
  loadPageData$: Observable<Action> = this.actions$
  .pipe(
      ofType(MissingCardsActionTypes.Load),
      flatMap(_ =>
        internalApiGet<MissingCardsPageDto>(
          this.http,
          'missingcards',
          dto => [
            new LoadInventoryAction(),
            new InitializedMissingCardsPageAction(dto),
          ]
        )
      ),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
