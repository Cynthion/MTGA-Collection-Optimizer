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
  historyCards: [
    // TODO remove after UI mock is not needed anymore
    {
      mtgaId: 67682,
      missingCount: 0,
      ownedCount: 0,
      name: 'Aegis of the Heavens Mock',
      rarity: Rarity.Uncommon,
      requiredCount: 0,
      requiringDeckNames: ['mock, mock, mock'],
      setCode: 'M19',
      timeStamp: new Date(),
      timeStampPrettyPrint: '',
      wildcardWorthinessFactor: 0,
    },
    {
      mtgaId: 66931,
      missingCount: 0,
      ownedCount: 0,
      name: 'Elenda the Dusk Rose',
      rarity: Rarity['Mythic Rare'],
      requiredCount: 0,
      requiringDeckNames: ['mock, mock, mock'],
      setCode: 'RIX',
      timeStamp: new Date(),
      timeStampPrettyPrint: '',
      wildcardWorthinessFactor: 0,
    },
  ],
};
