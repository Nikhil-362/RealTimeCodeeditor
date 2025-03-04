import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store); // Creates the persistor
export default store;
