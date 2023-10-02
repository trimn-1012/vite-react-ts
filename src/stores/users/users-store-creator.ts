import { type StateCreator } from 'zustand';

import { IUser } from '@/apis/getUser/types';

export type TUsersStore = {
  users: IUser[] | null;
  updateUsers: (users: IUser[]) => void;
};

export const usersStoreCreator: StateCreator<TUsersStore> = set => ({
  users: null,
  updateUsers: users => set(() => ({ users })),
});
