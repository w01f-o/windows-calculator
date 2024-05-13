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
      const { a } = state.output.expression;
      const { payload } = action;

      if (a === "0" && payload !== ".") {
        state.output.expression.a = payload;
      } else {
        state.output.expression.a += payload;
      }
    },
    addToB(state, action: PayloadAction<string>) {
      const { b } = state.output.expression;
      const { payload } = action;

      if (b === null) {
        state.output.expression.b = payload === "." ? "0." : payload;
      } else if (b === "0" && payload !== ".") {
        state.output.expression.b = payload;
      } else {
        state.output.expression.b += payload;
      }
    },
    setA(state, action: PayloadAction<string | null>) {
      state.output.expression.a = action.payload;
    },
    setB(state, action: PayloadAction<string | null>) {
      state.output.expression.b = action.payload;
    },
    setSign(state, action: PayloadAction<string | null>) {
      state.output.expression.sign = action.payload;
    },
    setResult(state, action: PayloadAction<number | null>) {
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
