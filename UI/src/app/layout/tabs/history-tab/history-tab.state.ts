import { State as ParentState } from '../tabs.state';
import { CollectionCardState } from '../../layout.state';
import { Rarity } from '../../../domain.state';

export const HISTORY_TAB_MODULE_FEATURE_NAME: keyof State = 'historyTab';

export interface CardRecord {
  id: number;
  count: number;
}

export interface HistoryDelta {
  mtgaId: number;
  timeStamp: Date;
}

export interface State extends ParentState {
  historyTab: HistoryTabState;
}

export interface HistoryCardState extends CollectionCardState {
  timeStamp: Date;
  timeStampPrettyPrint: string;
  requiringDeckNames: string[];
}

export interface HistoryTabState {
  existingCardRecords: CardRecord[];
  historyDeltas: HistoryDelta[];
  historyCards: HistoryCardState[];
}

export const initialHistoryTabState: HistoryTabState = {
  existingCardRecords: [],
  historyDeltas: [],
  historyCards: [{       // TODO remove after UI mock is not needed anymore
    mtgaId: 67682,
    missingCount: 2,
    ownedCount: 2,
    name: 'Aegis of the Heavens Mock',
    rarity: Rarity.Uncommon,
    requiredCount: 0,
    requiringDeckNames: ['mock'],
    setCode: 'M19',
    timeStamp: new Date(),
    timeStampPrettyPrint: '0 seconds ago',
    wildcardWorthinessFactor: 0,
  }],
};
