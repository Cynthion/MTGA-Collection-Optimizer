import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

import { ApiErrorDetailsDto } from './api-error.state';

@Component({
  selector: 'app-api-error',
  templateUrl: './api-error.component.html',
  styles: ['./api-error.component.scss'],
})
export class ApiErrorComponent {

  public apiErrorDetailsDto: ApiErrorDetailsDto;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    ) {
      this.apiErrorDetailsDto = data as ApiErrorDetailsDto;
      console.log(this.apiErrorDetailsDto);
  }

  closeSnackbar(): void {

  }
}
