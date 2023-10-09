import { type StateCreator } from 'zustand';

import { IUser } from '@/apis/getUser/types';

export type TLoginStore = {
  user: IUser | null;
  isAuthenticated: boolean;
  updateUser: (user: IUser) => void;
};

export const loginStoreCreator: StateCreator<TLoginStore> = set => ({
  user: null,
  isAuthenticated: false,
  updateUser: user => set(() => ({ user, isAuthenticated: true })),
});
