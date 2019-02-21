import { Action, ActionReducerMap } from '@ngrx/store';

function keys<T>(t: T) { // }: (keyof T)[] {
  return Object.keys(t) as any;
}

export function callNestedReducers<TState>(state: TState, action: Action, reducers: Partial<ActionReducerMap<TState, any>>): TState {
  let hasChanged = false;
  const newState = keys(reducers).reduce((s, key) => {
    const reducer = reducers[key];
    const childState = state[key];
    const newChildState = reducer!(childState, action);
    hasChanged = hasChanged || newChildState !== childState;
    s[key] = newChildState;
    return s;
  }, { ...(state as any) } as TState);

  return hasChanged ? newState : state;
}
