import { configureStore } from '@reduxjs/toolkit';
import authReducer from './userAuth';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import adminAuthReducer from "./adminAuth";
import userReducer from './usersSlice';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  adminAuth: adminAuthReducer,
  users : userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer, 
});

export default store ;
