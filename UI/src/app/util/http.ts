import { HttpClient, HttpResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Observable, ObservableInput } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { ApiErrorAction } from '../app.actions';
import { AppConfig } from '../../environments/environment';

export function makeInternalApiUrl(relativeUrl: string) {
  return `${AppConfig.apiBaseUrl}${relativeUrl.replace(/^\/*/, '')}`;
}

export function internalApiGet<TResponse = null>(
  http: HttpClient,
  relativeUrl: string,
  project: (resp: TResponse) => ObservableInput<Action>,
): Observable<Action> {
  return httpGet(http, makeInternalApiUrl(relativeUrl), project);
}

export function internalApiPost<TResponse = null>(
  http: HttpClient,
  relativeUrl: string,
  body: any,
  project: (resp: TResponse) => ObservableInput<Action>,
): Observable<Action> {
  return httpPost(http, makeInternalApiUrl(relativeUrl), project, body);
}

function httpGet<TResponse = null>(
  http: HttpClient,
  url: string,
  project: (resp: HttpResponse<TResponse> | TResponse) => ObservableInput<Action>,
): Observable<Action> {
  const obs = (() => {
    return http.get<TResponse>(url);
  })();

  return handleResponse(obs, project);
}

export function httpPost<TResponse = null>(
  http: HttpClient,
  url: string,
  project: (resp: HttpResponse<TResponse> | TResponse) => ObservableInput<Action>,
  body: any,
): Observable<Action> {
  const obs = (() => {
    return http.post<TResponse>(url, body);
  })();

  return handleResponse(obs, project);
}

function handleResponse<TResponse = null>(
  source: Observable<HttpResponse<TResponse> | TResponse>,
  project: (resp: HttpResponse<TResponse> | TResponse) => ObservableInput<Action>,
): Observable<Action> {
  return source.pipe(
    mergeMap(project),
    catchError<Action, Action>(resp => [new ApiErrorAction(resp.error)]),
  );
}
