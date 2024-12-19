import { configureStore } from "@reduxjs/toolkit";
import friendReducer from "./friendSlice";
import clubReducer from "./clubSlice"
import eventReducer from "./eventSlice"

export const store = configureStore({
    reducer: {
        club: clubReducer,
        friend: friendReducer,
        event: eventReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
