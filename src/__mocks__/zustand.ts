/* eslint-disable no-console */
import * as zustand from 'zustand';
import { act } from '@testing-library/react';

const { create: actualCreate, createStore: actualCreateStore } =
  await vi.importActual<typeof zustand>('zustand');

export const storeResetFns = new Set<() => void>();

export const create = (<T>() => {
  console.log('zustand create mock');

  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  };
}) as typeof zustand.create;

export const createStore = (<T>(stateCreator: zustand.StateCreator<T>) => {
  console.log('zustand createStore mock');

  const store = actualCreateStore(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
}) as typeof zustand.createStore;

afterEach(() => {
  act(() => {
    storeResetFns.forEach(resetFn => {
      resetFn();
    });
  });
});
