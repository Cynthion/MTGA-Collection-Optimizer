import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { InventoryState, InventoryFeatureState } from './inventory.state';
import { WildcardRequirementsUpdatedAction } from './inventory.actions';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent {
  state$: Observable<InventoryState>;

  constructor(
      private store: Store<InventoryFeatureState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s =>  s.inventory);

    store.select(s => s.missingCardsPage.collectionCards).subscribe(ccs => {
      this.actionsSubject.next(new WildcardRequirementsUpdatedAction({
        wildcardUncommonRequired: 10,
        wildcardCommonRequired: 20,
        wildcarRareRequired: 30,
        wildcardMythicRequired: 40,
      }));
    });
  }
}
