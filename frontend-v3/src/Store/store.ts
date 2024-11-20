import { configureStore, Middleware } from '@reduxjs/toolkit';
import counterReducer from "./counterSlice"

// Middleware tùy chỉnh
const customMiddleware: Middleware = (store) => (next) => (action) => {
    console.log('Middleware triggered:', action);
    next(action); // Chuyển tiếp action tới reducer
};

// Tạo store
const store = configureStore({
    reducer: {
        counter: counterReducer, // Kết nối reducer
    },
    middleware: (defaultMiddleware) =>
        defaultMiddleware().concat(customMiddleware), // Thêm middleware
});

// Lấy kiểu RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
