import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/apis/getUser/types';
import { IRootState } from '@/redux/types';

interface ISliceState {
  user: IUser | null;
}

const initialState: ISliceState = {
  user: null,
};
const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { updateUser } = actions;

export const userSelector = (state: IRootState) => state.login.user;
export const isAuthenticatedSelector = (state: IRootState) =>
  !!state.login.user;

export default reducer;
