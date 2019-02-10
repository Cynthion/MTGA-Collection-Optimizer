/// this is the root state for state that is shared among all components
export interface AppState {
  loadingSemaphore: number;
  isLoading: boolean;
}

export const initialAppState: AppState = {
  loadingSemaphore: 0,
  isLoading: false,
 };
