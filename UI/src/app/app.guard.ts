import { Injectable } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { CanActivate } from '@angular/router';

import { LoadSettingsAction } from './settings';

@Injectable()
export class AppGuard implements CanActivate {

  constructor(private actionsSubject: ActionsSubject) { }

  canActivate() {
    this.actionsSubject.next(new LoadSettingsAction());
    return true;
  }
}
