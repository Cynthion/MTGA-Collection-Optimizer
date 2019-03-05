import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';

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
    ) {
      this.apiErrorDetailsDto = data as ApiErrorDetailsDto;
      console.log(this.apiErrorDetailsDto);
  }

  getApiErrorMessage(): string {
    switch (this.apiErrorDetailsDto.apiErrorCode) {
      case 0: return 'The path to the MTGA output_log.txt file on your machine is not configured. Head over to the settings to make it right.';
      default: return this.apiErrorDetailsDto.message;
    }
  }

  closeSnackbar(): void {
    // TODO dispatch action to fix error, if possible
    this.snackbar.dismiss();
  }
}
