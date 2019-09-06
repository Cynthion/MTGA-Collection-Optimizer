import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { ActionsSubject } from '@ngrx/store';

import { OpenSettingsDialogAction } from '../settings/settings.actions';
import { LoadDataAction } from '../layout/layout.actions';

import { ApiErrorState } from './api-error.state';

@Component({
  selector: 'app-api-error',
  templateUrl: './api-error.component.html',
  styles: ['./api-error.component.scss'],
})
export class ApiErrorComponent {

  public state: ApiErrorState;

  constructor(
    private snackbar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private actionsSubject: ActionsSubject,
    ) {
      this.state = data as ApiErrorState;
  }

  getApiErrorMessage(): string {
    switch (this.state.apiErrorCode) {
      case 0: return 'The path to the MTGA output_log.txt file on your machine is not configured. Head over to the settings to make it right.';
      case 1: return 'The path to the MTGA output_log.txt file on your machine is invalid. Head over to the settings to make it right.';
      case 2: return 'Please enable detailed logs in the MTGA game and restart the game for this community-built application to work properly. (Settings > View Account Link > check Detailed Logs)';
      default: return this.state.message || 'Unknown Error.' + ' Please report this issue at https://github.com/Cynthion/MTGA-Collection-Optimizer/issues';
    }
  }

  closeSnackbar(): void {
    if (this.state.apiErrorCode === 0
      || this.state.apiErrorCode === 1) {
      this.actionsSubject.next(new OpenSettingsDialogAction());
    }
    if (this.state.apiErrorCode === 2) {
      this.actionsSubject.next(new LoadDataAction());
    }

    this.snackbar.dismiss();
  }
}
