import { combineReducers, configureStore } from "@reduxjs/toolkit";
import HistoryReducer from "./History/HistorySlice.ts";
import MemoryReducer from "./Memory/MemorySlice.ts";
import OutputReducer from "./Output/OutputSlice.ts";

const rootReducer = combineReducers({
  history: HistoryReducer,
  memory: MemoryReducer,
  output: OutputReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
