import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, Subscribable, Subscription } from 'rxjs';
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
export class InventoryComponent implements OnDestroy {
  state$: Observable<InventoryState>;

  collectionCardsSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
  ) {
    this.state$ = this.store.pipe(select(s => s.layout.inventory));

    // TODO find a better way instead of subscribing --> possible infinite loops
    // (actions should only be dispatched by user input or timely intervals)
    this.collectionCardsSubscription = this.store.pipe(select(s => s.layout.collectionCards))
      .subscribe(ccs => {
        this.actionsSubject.next(new UnknownCardsUpdatedAction(
          ccs.filter(cc => cc.rarity === -1).length
        )
      );

      this.actionsSubject.next(new WildcardRequirementsUpdatedAction({
        wildcardUncommonRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Uncommon), cc => cc.missingCount),
        wildcardCommonRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Common), cc => cc.missingCount),
        wildcarRareRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity.Rare), cc => cc.missingCount),
        wildcardMythicRequired: _.sumBy(ccs.filter(cc => cc.missingCount > 0 && cc.rarity === Rarity['Mythic Rare']), cc => cc.missingCount),
      }));
    });
  }

  ngOnDestroy(): void {
    this.collectionCardsSubscription.unsubscribe();
  }
}
