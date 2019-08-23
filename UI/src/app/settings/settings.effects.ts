import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { flatMap, map, debounceTime, filter } from 'rxjs/operators';

import { surroundWithLoadingActions } from '../app.actions';
import { LoadDataAction } from '../layout';
import { internalApiPost } from '../util/http';
import { PlatformServiceProvider } from '../providers/platform-service-provider';
import { StorageService } from '../providers/storage.service';

import { SettingsDto, SettingsStorageKey } from './settings.state';
import { SettingsActionTypes, ApplySettingsAction, InitializedSettingsAction, LoadSettingsAction, StoreSettingsAction, CloseSettingsDialogAction } from './settings.actions';
import { SettingsDialogComponent } from './settings.dialog';

@Injectable()
export class SettingsDialogEffects {
  private storageService: StorageService;
  private settingsDialogRef: MatDialogRef<SettingsDialogComponent, any>;

  @Effect()
  openSettingsDialog$: Observable<Action> = this.actions$
    .pipe(
      ofType(SettingsActionTypes.Open),
      filter(_ => this.dialog.openDialogs.length === 0),
      flatMap(_ => {
        this.settingsDialogRef = this.dialog.open(SettingsDialogComponent, {
          width: '800px',
          position: {
            top: '30px',
            right: '10px',
          }
        });
        return this.settingsDialogRef.afterClosed();
      }),
      flatMap(_ => []),
    );

  @Effect()
  closeSettingsDialog$: Observable<Action> = this.actions$
    .pipe(
      ofType(SettingsActionTypes.Close),
      map(a => a as CloseSettingsDialogAction),
      flatMap(_ => {
        const obs = this.settingsDialogRef.beforeClose();
        this.settingsDialogRef.close();
        return obs;
      }),
      debounceTime(500),
      flatMap(_ => []),
    );

  @Effect()
  loadSettings: Observable<Action> = this.actions$
    .pipe(
      ofType(SettingsActionTypes.Load),
      flatMap(_ => {
        const settingsDto = this.storageService.load<SettingsDto>(SettingsStorageKey);

        return [new InitializedSettingsAction(settingsDto)];
      })
    );

  @Effect()
  storeSettings: Observable<Action> = this.actions$
    .pipe(
      ofType(SettingsActionTypes.Store),
      map(a => a as StoreSettingsAction),
      flatMap(a => {
        const settingsDto = a.dto;
        this.storageService.store(SettingsStorageKey, settingsDto);

        return [new ApplySettingsAction(settingsDto)];
      })
    );

  @Effect()
  applySettings$: Observable<Action> = this.actions$
    .pipe(
      ofType(SettingsActionTypes.Apply),
      map(a => a as ApplySettingsAction),
      flatMap(a =>
        surroundWithLoadingActions(
          internalApiPost(
            this.http,
            'settings',
            a.dto,
            _ => [new LoadDataAction()]
          ))
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
