import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expression, History } from "@/types/calculator.types.ts";

interface State {
  history: History[];
  memory: number[];
  output: {
    expression: Expression;
    result: number | null;
    isFinish: boolean;
    isError: boolean;
  };
}

const initialState: State = {
  history: [],
  memory: [],
  output: {
    expression: {
      a: "0",
      sign: null,
      b: null,
    },
    result: null,
    isFinish: false,
    isError: false,
  },
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    addToA(state, action: PayloadAction<string>) {
      if (state.output.expression.a === "0" && action.payload !== ".") {
        state.output.expression.a = action.payload;
      } else {
        state.output.expression.a += action.payload;
      }
    },
    addToB(state, action: PayloadAction<string>) {
      if (state.output.expression.b === null) {
        if (action.payload === ".") {
          state.output.expression.b = "0.";
        } else {
          state.output.expression.b = action.payload;
        }
      } else {
        state.output.expression.b += action.payload;
      }
    },
    setA(state, action: PayloadAction<string | null>) {
      state.output.expression.a = action.payload;
    },
    setB(state, action: PayloadAction<string | null>) {
      state.output.expression.b = action.payload;
    },
    setSign(state, action: PayloadAction<string>) {
      state.output.expression.sign = action.payload;
    },
    setResult(state, action: PayloadAction<number>) {
      state.output.result = action.payload;
    },
    setIsFinish(state, action: PayloadAction<boolean>) {
      state.output.isFinish = action.payload;
    },
    addToHistory(state, action: PayloadAction<History>) {
      state.history.push(action.payload);
    },
    setFromHistory(state, action: PayloadAction<History>) {
      state.output.expression = action.payload.expression;
      state.output.result = action.payload.result;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.output.isError = action.payload;
    },
    clearAll() {
      return initialState;
    },
  },
});

export const {
  addToA,
  addToB,
  setA,
  setB,
  clearAll,
  setSign,
  setResult,
  setIsFinish,
  setIsError,
  addToHistory,
  setFromHistory,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
