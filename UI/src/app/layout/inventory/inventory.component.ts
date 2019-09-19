import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, Subscribable, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { InventoryState, State } from './inventory.state';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent {
  state$: Observable<InventoryState>;

  constructor(
    private store: Store<State>,
  ) {
    this.state$ = this.store.pipe(select(s => s.layout.inventory));
  }
}
