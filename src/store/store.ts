import { configureStore } from "@reduxjs/toolkit";
import wordReducer from "./wordSlice";
import { WordsState } from "./wordSlice";
export type RootState = {
  words: WordsState;
};

const rootReducer = configureStore({
  reducer: { words: wordReducer },
});

export default rootReducer;
