import { Component, Inject } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { ApiErrorState } from './api-error.state';
import { RootState } from '../app.state';
import { take } from 'rxjs/operators';
import { CloseApiErrorSnackbarAction } from './api-error.actions';

@Component({
  selector: 'app-api-error',
  templateUrl: './api-error.component.html',
  styles: ['./api-error.component.scss'],
})
export class ApiErrorComponent {
  state$: Observable<ApiErrorState>;

  constructor(
    private store: Store<RootState>,
    private actionsSubject: ActionsSubject,
  ) {
    this.state$ = this.store.pipe(select(s => s.app.apiError));
  }

  getApiErrorMessage(apiError: ApiErrorState): string {
    switch (apiError.apiErrorCode) {
      case 0: return 'Connection to the backend failed. Ensure the backend is running.';
      case 1: return 'The path to the MTGA output_log.txt file on your machine is invalid. Head over to the settings to make it right.';
      case 2: return 'Please enable detailed logs in the MTGA game and restart the game for this community-built application to work properly. (Settings > View Account Link > check Detailed Logs)';
      case 3: return 'The path to the \'\\Wizards Of The Coast\\MTGA\\MTGA_Data\\Downloads\\Data\' folder on your machine is invalid. Head over to the settings to make it right.';
      default: return apiError.message || 'Unknown Error.' + ' Please report this issue at https://github.com/Cynthion/MTGA-Collection-Optimizer/issues';
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.closeSnackbar();
    }
  }

  closeSnackbar(): void {
    let apiErrorCode = -1;
    this.state$.pipe(take(1)).subscribe(s => apiErrorCode = s.apiErrorCode);
    this.actionsSubject.next(new CloseApiErrorSnackbarAction(apiErrorCode));
  }
}
