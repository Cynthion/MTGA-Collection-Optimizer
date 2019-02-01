export interface AppState {
  version: string;
}

export const initialAppState: AppState = {
  version: '',
};

export interface RootState {
  app: AppState;
}
