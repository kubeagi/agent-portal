'use client';

import { configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { setCookie } from '@/utils/client';
import { AUTH_DATA } from '@/utils/constants';

let store: any;

const reducer = (state = {}, action: any) => {
  switch (action.type) {
    case 'TRIGGER_THEME': {
      setCookie('theme', action.theme); // todo remove, use user profile by bff ?
      return {
        ...state,
        theme: action.theme,
      };
    }
    case 'TRIGGER_PAGE_LOADING': {
      return {
        ...state,
        pageLoading: action.pageLoading,
      };
    }
    case 'SAVE_AUTH_DATA': {
      return {
        ...state,
        [AUTH_DATA]: action[AUTH_DATA],
      };
    }
    default: {
      return state;
    }
  }
};

function initStore(preloadedState = {}) {
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
  const init = _initialState || {};
  const _store = useMemo(() => initializeStore(init), [init]);
  return _store;
}
