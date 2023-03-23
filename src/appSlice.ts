import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '@/apis/getUser/types';
import { IRootState } from '@/redux/types';

interface ISliceState {
  users: IUser[] | null;
}

const initialState: ISliceState = {
  users: null,
};
const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
  },
});

const { reducer, actions } = slice;

export const { updateUsers } = actions;

export const usersSelector = (state: IRootState) => state.app.users;

export default reducer;
