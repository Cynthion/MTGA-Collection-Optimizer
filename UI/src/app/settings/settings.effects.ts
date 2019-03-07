import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

import { internalApiPost } from '../util/http';
import { PlatformServiceProvider } from '../providers/platform-service-provider';
import { StorageService } from '../providers/storage.service';
import { LoadMissingCardsPageAction } from '../missing-cards/missing-cards-page';
import { SettingsDialogDto, SettingsStorageKey } from './settings.state';
import { SettingsActionTypes, ApplySettingsDialogAction, InitializedSettingsDialogAction, LoadSettingsDialogAction } from './settings.actions';
import { SettingsDialogComponent } from './settings.dialog';

@Injectable()
export class SettingsDialogEffects {
  private storageService: StorageService;

  @Effect()
  openSettings$: Observable<Action> = this.actions$
  .pipe(
    ofType(SettingsActionTypes.Open),
    tap(a => console.log(a)),
    flatMap(_ => this.dialog.open(SettingsDialogComponent, {
      width: '500px',
      position: {
        top: '30px',
        right: '10px',
      }
    }).afterOpen()),
    flatMap(_ => [new LoadSettingsDialogAction()])
  );

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
    map(a => a as ApplySettingsDialogAction),
    flatMap(a =>
      internalApiPost(
        this.http,
        'settings',
        a.settingsDialogState,
        dto => [new LoadMissingCardsPageAction()]
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private dialog: MatDialog,
    private platformServiceProvicer: PlatformServiceProvider,
  ) {
    this.storageService = this.platformServiceProvicer.getStorageService();
  }
}
