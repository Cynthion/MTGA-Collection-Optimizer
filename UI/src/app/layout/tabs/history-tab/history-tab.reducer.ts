import * as _ from 'lodash';

import { HistoryTabState, initialHistoryTabState } from './history-tab.state';
import { HistoryTabActions } from './history-tab.actions';

export function historyTabReducer(state: HistoryTabState = initialHistoryTabState, action: HistoryTabActions): HistoryTabState {
  switch (action.type) {
    default: {
      return state;
    }
  }

  // function getTimestampPrettyPrint(oldDate: Date, newDate: Date): string {
  //   const diff = Math.abs(oldDate.getTime() - newDate.getTime());
  //   const seconds = Math.floor(diff / 1000);
  //   const minutes = Math.floor(seconds / 60);

  //   if (seconds < 60) {
  //     return `${seconds} ${seconds < 2 ? 'second' : 'seconds'} ago`;
  //   }
  //   if (minutes < 60) {
  //     return `${minutes} ${minutes < 2 ? 'minute' : 'minutes'} ago`;
  //   }
  //   return oldDate.toLocaleString();
  // }
}
