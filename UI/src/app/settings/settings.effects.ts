import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { internalApiPost } from '../util/http';
import { PlatformServiceProvider } from '../providers/platform-service-provider';
import { StorageService } from '../providers/storage.service';
import { LoadMissingCardsPageAction } from '../missing-cards/missing-cards-page';
import { SettingsDialogDto, SettingsStorageKey } from './settings.state';
import { SettingsActionTypes, ApplySettingsDialogAction, InitializedSettingsDialogAction } from './settings.actions';

@Injectable()
export class SettingsDialogEffects {
  private storageService: StorageService;

  @Effect()
  loadDialogData$: Observable<Action> = this.actions$
  .pipe(
      ofType(SettingsActionTypes.Load),
      tap(a => console.log(a)),
      flatMap(_ => {
        const settingsDialogDto = this.storageService.load<SettingsDialogDto>(SettingsStorageKey);

        return [new InitializedSettingsDialogAction(settingsDialogDto)];
      })
    );

  @Effect()
  applySettings$: Observable<Action> = this.actions$
  .pipe(
    ofType(SettingsActionTypes.Apply),
    tap(a => console.log(a)),
    flatMap(_ =>
      internalApiPost(
        this.http,
        'settings',
        {},
        dto => [new LoadMissingCardsPageAction()]
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private platformServiceProvicer: PlatformServiceProvider,
  ) {
    this.storageService = this.platformServiceProvicer.getStorageService();
  }
}
