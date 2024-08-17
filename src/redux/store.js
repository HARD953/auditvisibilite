import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './slices/userSlice'
import userInfoSlice from './slices/userInfoSlice';
import React from 'react';

export const store = configureStore({
  reducer: {
    loginUser: userSliceReducer,
    userInfo: userInfoSlice,
  },
});