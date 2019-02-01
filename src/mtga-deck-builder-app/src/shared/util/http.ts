import { HttpClient, HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Observable, ObservableInput } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

export function internalApiGet<TResponse = null>(
  http: HttpClient,
  url: string,
  project: (resp: TResponse) => ObservableInput<Action>,
): Observable<Action> {
  const obs = (() => {
    return http.get<TResponse>(url, {
      observe: 'body',
      withCredentials: true,
    });
  })();

  return handleResponse(
    obs,
    project,
  );
}

function handleResponse<TResponse = null>(
  source: Observable<HttpResponse<TResponse> | TResponse>,
  project: (resp: HttpResponse<TResponse> | TResponse) => ObservableInput<Action>,
): Observable<Action> {
  const obs = source.pipe(
    mergeMap(project),
    catchError<Action, Action>(resp => [/*new HandleApiErrorAction(resp)*/]),
  );

  return obs;
}
