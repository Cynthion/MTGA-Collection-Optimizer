import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { ApplicationDataDto } from './app.state';
import { LoadAppDataAction, AppInitializedAction } from './app.actions';
import { flatMap } from 'rxjs/operators';
import { internalApiGet } from '../shared/util/http';

@Injectable()
export class AppEffects {

  @Effect()
  loadAppData$: Observable<Action> = this.actions$
    .pipe(
      ofType(LoadAppDataAction.TYPE),
      flatMap(() =>
        internalApiGet<ApplicationDataDto>(
          this.http,
          'app-data',
          appData => {
            return [
              new AppInitializedAction(),
            ];
          }
        )
      )
    );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}
}
