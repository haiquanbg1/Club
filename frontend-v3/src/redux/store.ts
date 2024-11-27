// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import clubReducer from './clubSlice';

const store = configureStore({
    reducer: {
        club: clubReducer,  // Kết nối clubReducer vào store
    },
});

export type RootState = ReturnType<typeof store.getState>;  // Định nghĩa kiểu RootState
export type AppDispatch = typeof store.dispatch;  // Định nghĩa kiểu AppDispatch

export default store;
