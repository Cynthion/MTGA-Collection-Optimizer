import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { Rarity } from '../../domain.state';

import { InventoryState, State } from './inventory.state';
import { WildcardRequirementsUpdatedAction, UnknownCardsUpdatedAction } from './inventory.actions';

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
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s =>  s.layout.inventory);

    this.store.select(s => s.layout.collectionCards).subscribe(ccs => {
      this.actionsSubject.next(new UnknownCardsUpdatedAction(
        ccs.filter(cc => cc.rarity === -1).length
      ));

      this.actionsSubject.next(new WildcardRequirementsUpdatedAction({
        wildcardUncommonRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Uncommon), cc => cc.missingCount),
        wildcardCommonRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Common), cc => cc.missingCount),
        wildcarRareRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Rare), cc => cc.missingCount),
        wildcardMythicRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity['Mythic Rare']), cc => cc.missingCount),
      }));
    });
  }
}
