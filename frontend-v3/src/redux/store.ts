// src/redux/store.ts
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { clubReducer } from './clubReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage là mặc định

// Cấu hình persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['clubRoles'], // Chỉ persist clubRoles
};

// Kết hợp reducers nếu có nhiều reducers
const rootReducer = combineReducers({
    club: clubReducer,
});

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = createStore(persistedReducer);

// Tạo persistor để sử dụng trong PersistGate
export const persistor = persistStore(store);
