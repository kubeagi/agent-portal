'use client';

import { configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';

let store: any;

const initialState = {
  theme: typeof window === 'undefined' ? 'light' : localStorage.getItem('theme') || 'light', // todo remove: use server
  activeChat: 'name',
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
    case 'CLICK_CHAT': {
      return {
        ...state,
        activeChat: action.activeChat,
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
    devTools: process.env.NODE_ENV !== 'production',
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

export function useStore(_initialState?: any) {
  const init = _initialState || initialState;
  const _store = useMemo(() => initializeStore(init), [init]);
  return _store;
}
