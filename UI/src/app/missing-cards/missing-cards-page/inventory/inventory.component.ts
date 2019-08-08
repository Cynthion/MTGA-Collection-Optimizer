import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { InventoryState, InventoryFeatureState } from './inventory.state';
import { WildcardRequirementsUpdatedAction } from './inventory.actions';
import { Rarity } from '../missing-cards.state';

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
        wildcardUncommonRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Uncommon), cc => cc.missingCount),
        wildcardCommonRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Common), cc => cc.missingCount),
        wildcarRareRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Rare), cc => cc.missingCount),
        wildcardMythicRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity['Mythic Rare']), cc => cc.missingCount),
      }));
    });
  }
}
