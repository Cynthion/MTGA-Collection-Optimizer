import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { InventoryState } from './inventory.state';
import { RootState } from 'src/app/missing-cards/missing-cards-page';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent {
  state$: Observable<InventoryState>;

  constructor(
      private store: Store<RootState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s => s.inventory);
  }
}
