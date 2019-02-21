import { Injectable } from '@angular/core';
import { LoadSettingsDialogAction } from './settings';
import { ActionsSubject } from '@ngrx/store';
import { CanActivate } from '@angular/router';

@Injectable()
export class AppGuard implements CanActivate {

  constructor(private actionsSubject: ActionsSubject) { }

  canActivate() {
    this.actionsSubject.next(new LoadSettingsDialogAction());
    return true;
  }
}