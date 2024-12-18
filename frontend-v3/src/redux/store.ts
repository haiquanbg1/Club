import { configureStore } from "@reduxjs/toolkit";
import friendReducer from "./friendSlice";
import clubReducer from "./clubSlice"
export const store = configureStore({
    reducer: {
        friend: friendReducer,
        club: clubReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
