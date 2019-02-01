import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class MissingCardsPageEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
