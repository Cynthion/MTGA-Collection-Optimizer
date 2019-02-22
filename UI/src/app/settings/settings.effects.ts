import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { internalApiGet } from '../util/http';
import { SettingsDialogDto } from './settings.state';
import { SettingsActionTypes, InitializedSettingsDialogAction } from './settings.actions';

@Injectable()
export class SettingsDialogEffects {

  @Effect()
  loadDialogData$: Observable<Action> = this.actions$
  .pipe(
      ofType(SettingsActionTypes.Load),
      tap(a => console.log(a)),
      flatMap(_ =>
        internalApiGet<SettingsDialogDto>(
          this.http,
          'settings',
          dto => [
            new InitializedSettingsDialogAction(dto),
          ]
        )
      ),
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}