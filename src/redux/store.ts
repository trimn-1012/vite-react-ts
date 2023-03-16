import { configureStore } from '@reduxjs/toolkit';

import globalReducer from '../globalSlice';

export default configureStore({
  reducer: {
    global: globalReducer,
  },
});
