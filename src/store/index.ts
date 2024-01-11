import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';

let store: any;

const initialState = {
  theme: localStorage.getItem('theme') || 'light', // todo remove: use server
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'TRIGGER_SHEME': {
      localStorage.setItem('theme', action.theme); // todo remove
      return {
        ...state,
        theme: action.theme,
      };
    }
    default: {
      return state;
    }
  }
};

function initStore(preloadedState = initialState) {
  return configureStore({
    reducer,
    preloadedState,
    enhancer: composeWithDevTools(applyMiddleware()),
  });
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(_initialState: any) {
  const _store = useMemo(() => initializeStore(_initialState), [_initialState]);
  return _store;
}
