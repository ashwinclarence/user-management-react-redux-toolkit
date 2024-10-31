import { combineReducers, configureStore } from "@reduxjs/toolkit";
import manageUserSlice from '../features/admin/manageUserSlice'; 
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist"; 

const persistConfig = {
    key: "root",
    storage, 
}

const rootReducer = combineReducers({
    admin: manageUserSlice, // Fixed typo
})

const persistedReducer = persistReducer(persistConfig, rootReducer); // Fixed variable name

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
