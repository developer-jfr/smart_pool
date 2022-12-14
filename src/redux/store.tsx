import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './auth/reducer';
import transactionReducer from './transaction/reducer';
import {authApi} from "../services/auth-services";

const rootReducer = combineReducers({
    authReducer,
    transactionReducer,
    [authApi.reducerPath]: authApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(authApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
