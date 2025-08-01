import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import movieReducer from "./movieSlice"
import gptReducer from "./gptToggleSlice"
import configReducer from "./configSlice"

export const store = configureStore({
  reducer: {
    user:userReducer,
    movie:movieReducer,
    gpt:gptReducer,
    config:configReducer,
  },
})