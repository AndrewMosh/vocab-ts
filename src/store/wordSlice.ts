import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "./storage";
export interface Words {
  id: number;
  term: string;
  definition: string;
  learned: boolean;
  right: boolean;
  wrong: boolean;
  empty: boolean;
}
export type WordsState = {
  filter(arg0: (word: Words) => boolean): unknown;
  map(
    arg0: (word: any) => false | import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  find(arg0: ({ id }: { id: any }) => boolean): unknown;
  words: Words[];
};

const wordSlice = createSlice({
  name: "words",
  initialState: loadState() || [],
  reducers: {
    handleAdd: (state, action) => {
      state.push(action.payload);
    },
    toggleMove: (state, action) => {
      const updatedItems = state.map((item: Words) => {
        if (item.id === action.payload) {
          return { ...item, learned: !item.learned };
        }
        return item;
      });
      return (state = updatedItems);
    },
    deleteWord: (state, action) => {
      return state.filter((word: Words) => word.id !== action.payload);
    },
    editWord: (state, action) => {
      const updatedItems = state.map((item: Words) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            term: action.payload.term,
            definition: action.payload.definition,
          };
        }
        return item;
      });
      return (state = updatedItems);
    },
  },
});
export const { actions, reducer } = wordSlice;
export const { handleAdd, toggleMove, deleteWord, editWord } =
  wordSlice.actions;
export default function mySliceReducer(state: any, action: AnyAction) {
  const newState = reducer(state, action);
  saveState(newState);
  return newState;
}
