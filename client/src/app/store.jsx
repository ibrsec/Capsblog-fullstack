import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/authSlice";
import categorySlice from "./features/categorySlice";
import blogSlice from "./features/blogSlice";
import commentSlice from "./features/commentSlice";
import emailSlice from "./features/emailSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  category: categorySlice,
  blog: blogSlice,
  comment:commentSlice,
  email:emailSlice,
});

const persistConfig = {
  key: "blogCaps",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "prod",
});

export const persistor = persistStore(store);
