import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import { first, map } from 'rxjs/operators';

import { PlatformServiceProvider } from '../providers/platform-service-provider';
import { StorageService } from '../providers/storage.service';
import { SettingsStorageKey, SettingsDto } from '../settings/settings.state';
import { StoreBackendSettingsAction } from '../settings/settings.actions';

import { LayoutActionTypes, LoadDataAction } from './layout.actions';

@Injectable()
export class LayoutInitializationGuard implements CanActivate {
  private storageService: StorageService;

  constructor(
    private platformServiceProvicer: PlatformServiceProvider,
    private actionsSubject: ActionsSubject
  ) {
    this.storageService = this.platformServiceProvicer.getStorageService();
  }

  canActivate(route: ActivatedRouteSnapshot) {
    // provide user settings to backend before first data load
    const userSettings = this.storageService.load<SettingsDto>(SettingsStorageKey);

    if (userSettings !== null) {
      console.log('Found user settings:', userSettings);
      this.actionsSubject.next(new StoreBackendSettingsAction(userSettings));
    } else {
      console.log('No user settings found.');
      this.actionsSubject.next(new LoadDataAction());
    }

    return this.actionsSubject.pipe(
      first(a => a.type === LayoutActionTypes.Initialize),
      map(() => true),
    );
  }
}
