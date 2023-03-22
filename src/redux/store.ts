import { configureStore } from '@reduxjs/toolkit';

import appReducer from '@/appSlice';
import userReducer from '@/pages/Login/slice';

export default configureStore({
  reducer: {
    app: appReducer,
    login: userReducer,
  },
});
