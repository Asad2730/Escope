import { configureStore } from '@reduxjs/toolkit';
import authReducer  from './auth/authSlice';
import msgReducer  from './msg/msgSlice';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const Auth = persistReducer(persistConfig, authReducer)
const Msg = persistReducer(persistConfig,msgReducer)

export const store = configureStore({
  reducer: {
    auth: Auth ,
    msg:Msg
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
    warningThreshold: 100, 
  }),

});

export const persistor = persistStore(store)
