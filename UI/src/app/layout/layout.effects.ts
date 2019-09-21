import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { surroundWithLoadingActions } from '../app.actions';
import { internalApiGet } from '../util/http';

import { LayoutActionTypes, InitializeLayoutAction, LoadDataAction } from './layout.actions';
import { LayoutDto } from './layout.state';

@Injectable()
export class LayoutEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .pipe(
      ofType(LayoutActionTypes.LoadData),
      map(a => a as LoadDataAction),
      switchMap(a =>
        surroundWithLoadingActions(
          internalApiGet<LayoutDto>(
            this.http,
            'layout/load-data',
            dto => [
              new InitializeLayoutAction(dto),
            ]
          )
        )),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
