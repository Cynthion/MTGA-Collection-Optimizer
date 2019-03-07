import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { ActionsSubject } from '@ngrx/store';

import { OpenSettingsAction } from '../app.actions';
import { ApiErrorDetailsDto } from './api-error.state';

@Component({
  selector: 'app-api-error',
  templateUrl: './api-error.component.html',
  styles: ['./api-error.component.scss'],
})
export class ApiErrorComponent {

  public apiErrorDetailsDto: ApiErrorDetailsDto;

  constructor(
    private snackbar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private actionsSubject: ActionsSubject,
    ) {
      this.apiErrorDetailsDto = data as ApiErrorDetailsDto;
  }

  getApiErrorMessage(): string {
    switch (this.apiErrorDetailsDto.apiErrorCode) {
      case 0: return 'The path to the MTGA output_log.txt file on your machine is not configured. Head over to the settings to make it right.';
      case 1: return 'The path to the MTGA output_log.txt file on your machine is invalid. Head over to the settings to make it right.';
      default: return this.apiErrorDetailsDto.message || 'Unknown Error.' + ' Please report this issue at https://github.com/Cynthion/MTGA-Collection-Optimizer/issues';
    }
  }

  closeSnackbar(): void {
    if (this.apiErrorDetailsDto.apiErrorCode === 0) {
      this.actionsSubject.next(new OpenSettingsAction());
    }

    this.snackbar.dismiss();
  }
}
