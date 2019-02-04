import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { flatMap } from 'rxjs/operators';
import { internalApiGet } from 'src/app/util/http';
import { InventoryActionTypes, InitializedInventoryAction } from './inventory.actions';
import { InventoryDto } from './inventory.state';

@Injectable()
export class InventoryEffects {

  @Effect()
  loadData$: Observable<Action> = this.actions$
  .pipe(
      ofType(InventoryActionTypes.Load),
      flatMap(_ =>
        internalApiGet<InventoryDto>(
          this.http,
          'inventory',
          dto => [new InitializedInventoryAction(dto)]
        )
      ),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
