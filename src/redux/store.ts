import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coordinatesReducer from './coordinates/slice';
import placesReducer from "./places/slice";

const rootReducer = combineReducers({
    coordinatesReducer,
    placesReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']