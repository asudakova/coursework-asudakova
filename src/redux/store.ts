import { combineReducers, configureStore } from "@reduxjs/toolkit"
import coordinatesRedcer from './coordinates/slice'

const rootReducer = combineReducers({
    coordinatesRedcer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']