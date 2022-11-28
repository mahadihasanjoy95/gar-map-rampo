import {
    configureStore,
    combineReducers
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import {persistReducer} from "redux-persist";
import mapSlice from "./MapSlice";

const reducers = combineReducers({
    mapReducers : mapSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(logger),
    devTools: process.env.NODE_ENV !== "production",
});
export default store;
