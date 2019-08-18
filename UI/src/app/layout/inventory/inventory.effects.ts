import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { surroundWithLoadingActions } from '../../app.actions';
import { internalApiGet } from '../../util/http';

import { InventoryDto } from './inventory.state';
import { InventoryActionTypes, InitializedInventoryAction } from './inventory.actions';

@Injectable()
export class InventoryEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions$
    .pipe(
      ofType(InventoryActionTypes.Load),
      tap(a => console.log(a)),
      flatMap(_ =>
        surroundWithLoadingActions(
          internalApiGet<InventoryDto>(
            this.http,
            'inventory',
            dto => [
              new InitializedInventoryAction(dto),
            ]
          ))
      ),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
