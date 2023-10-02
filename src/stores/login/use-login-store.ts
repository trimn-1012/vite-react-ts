import { create } from 'zustand';

import { type TLoginStore, loginStoreCreator } from './login-store-creator';

export const useLoginStore = create<TLoginStore>()(loginStoreCreator);
