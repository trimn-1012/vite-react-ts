import { create } from 'zustand';

import { type TUsersStore, usersStoreCreator } from './users-store-creator';

export const useUsersStore = create<TUsersStore>()(usersStoreCreator);
