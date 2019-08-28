import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap, map } from 'rxjs/operators';

import { surroundWithLoadingActions } from '../app.actions';
import { internalApiGet } from '../util/http';

import { LayoutActionTypes, InitializeLayoutAction, CalculateCollectionCardsAction, CalculateDeckCompletenessAction, LoadDataAction } from './layout.actions';
import { LayoutDto } from './layout.state';
import { CalculateHistoryDeltasAction } from './tabs/history-tab/history-tab.actions';

@Injectable()
export class LayoutEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .pipe(
      ofType(LayoutActionTypes.LoadData),
      map(a => a as LoadDataAction),
      flatMap(a =>
        surroundWithLoadingActions(
          internalApiGet<LayoutDto>(
            this.http,
            'layout/load-data',
            dto => [
              new InitializeLayoutAction(dto),
              new CalculateHistoryDeltasAction(dto.playerCards.map(pc => pc.mtgaId)),
              new CalculateCollectionCardsAction(),
              new CalculateDeckCompletenessAction(),
            ]
          )
        )),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
