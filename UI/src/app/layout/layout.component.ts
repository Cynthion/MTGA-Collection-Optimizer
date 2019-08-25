import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';

import { makeInternalApiUrl } from '../util/http';

import { State } from './layout.state';
import { LoadDataAction } from './layout.actions';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {

  protected eventSource: EventSource;
  protected isSseSubscribed: boolean;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
  ) { }

  ngOnInit() {
    this.subscribeToServerSentEvents();
  }

  ngOnDestroy() {
    this.unsubscribeFromServerSentEvents();
  }

  subscribeToServerSentEvents() {
    if (!this.isSseSubscribed) {
      this.eventSource = new EventSource(makeInternalApiUrl('sse-layout-data'));
      this.eventSource.onopen = (evt) => this.onEventSourceOpen(evt);
      this.eventSource.onmessage = (data) => this.onEventSourceMessage(data);
      this.eventSource.onerror = (evt) => this.onEventSourceError(evt);

      this.isSseSubscribed = true;
    }
  }

  unsubscribeFromServerSentEvents(): void {
    if (this.isSseSubscribed) {
      this.eventSource.close();
      this.isSseSubscribed = false;
    }
  }

  protected onEventSourceOpen(event: Event) {
    console.log('SSE connection established');
  }

  protected onEventSourceMessage(messageEvent: MessageEvent): void {
    console.log('SSE connection message:', messageEvent.data);

    this.actionsSubject.next(new LoadDataAction());
  }

  protected onEventSourceError(event: Event): void {
    console.log('SSE connection error:', event);
    if (event.eventPhase === this.eventSource.CLOSED) {
      this.eventSource.close();
      console.log('SSE connection closed.');
    }
  }
}
