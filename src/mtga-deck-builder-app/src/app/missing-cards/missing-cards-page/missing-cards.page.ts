import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MissingCardsPageState, RootState, MissingCardDto } from './missing-cards.state';

@Component({
  templateUrl: './missing-cards.page.html',
  styleUrls: ['./missing-cards.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingCardsPageComponent {
  @HostBinding('class.page') page = true;

  state$: Observable<MissingCardsPageState>;

  constructor(
      private store: Store<RootState>,
      private actionsSubject: ActionsSubject,
    ) {
    this.state$ = store.select(s => s.missingCardsPage);
  }

  trackByCardId(_: number, card: MissingCardDto) {
    console.log(card.id);
    return card.id;
  }
}
