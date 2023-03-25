import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import CounterReducer from './counter';
import UserReducer from './user';

const PERSISTED_KEYS: string[] = ['user', 'transactions'];

const persistConfig = {
    key: 'primary',
    whitelist: PERSISTED_KEYS,
    blacklist: ['profile'],
    storage: AsyncStorage,
    version: 1,
};

// const logger = createLogger();

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        // add something
        counter: CounterReducer,
        user: UserReducer,
    })
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV === 'development',
});

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
