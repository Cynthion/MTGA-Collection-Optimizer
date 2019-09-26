import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { TabsState, State } from './tabs.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  state$: Observable<TabsState>;

  constructor(
    private store: Store<State>,
  ) {
    this.state$ = this.store.pipe(select(s => s.tabs));
  }
}
