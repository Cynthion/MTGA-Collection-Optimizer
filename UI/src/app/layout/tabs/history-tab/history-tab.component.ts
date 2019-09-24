import { ChangeDetectionStrategy, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActionsSubject, Store, select } from '@ngrx/store';
import { Observable, combineLatest, interval } from 'rxjs';
import * as _ from 'lodash';

import { Rarity } from '../../../domain.state';
import { getRarityClass, getOwnedOfRequired } from '../../../domain.utils';

import { HistoryTabState, State, HistoryCardState } from './history-tab.state';
import { FilterValueChangedAction, ClearFilterAction } from './history-tab.actions';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTabComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  state$: Observable<HistoryTabState>;
  dataSource$: Observable<MatTableDataSource<HistoryCardState>>;

  displayedColumns: string[] = ['name', 'setCode', 'ownedCount', 'missingCount', 'requiringDeckNames', 'timeStamp'];
  filterValue: string;
  soundEffect: any;

  constructor(
    private store: Store<State>,
    private actionsSubject: ActionsSubject,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.state$ = this.store.pipe(select(s => s.historyTab));

    // TODO make side effect
    // this.soundEffect = new Audio();
    // this.soundEffect.src = 'assets/sound/newCard.mp3';
    // this.soundEffect.load();
    // this.soundEffect.play();

    const dataSourceChanged$ = combineLatest(
      this.store.select(s => s.layout.historyCards),
      this.store.select(s => s.historyTab.filterValue),
    );

    this.dataSource$ = dataSourceChanged$.pipe(
      map(([historyCards, filterValue]) => {
        const dataSource = new MatTableDataSource(historyCards);
        dataSource.paginator = this.paginator;
        dataSource.sort = this.sort;

        dataSource.filterPredicate = (data: HistoryCardState, filter: string): boolean => {
          return data.collectionCard.data.name.trim().toLowerCase().includes(filter);
        };
        dataSource.filter = filterValue;
        this.filterValue = filterValue;

        return dataSource;
      }),
    );

    // const intervalSubscription = interval(2000).subscribe(i => {
    //   this.changeDetector.markForCheck();
    //   console.log(i);
    // });
  }

  applyFilter(filterValue: string): void {
    if (!!filterValue) {
      this.actionsSubject.next(new FilterValueChangedAction(filterValue.trim().toLowerCase()));
    } else {
      this.clearFilter();
    }
  }

  clearFilter(): void {
    this.actionsSubject.next(new ClearFilterAction());
  }

  getRarityColorClass(rarity: Rarity): string {
    return getRarityClass(rarity);
  }

  getOwnedOfRequired(ownedCount: number, requiredCount: number): string {
    return getOwnedOfRequired(ownedCount, requiredCount);
  }
}
