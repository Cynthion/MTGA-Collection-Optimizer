import { RootState } from '../../app.state';

export const TABS_FEATURE_NAME: keyof TabsFeatureState = 'tabs';

export interface TabsFeatureState extends RootState {
  tabs: TabsState;
}

export interface TabsState {

}

export const initialTabsState: TabsState = {

};
