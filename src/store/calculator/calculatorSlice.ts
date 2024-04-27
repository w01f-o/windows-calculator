import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expression, History } from "@/types/calculator.types.ts";

interface State {
  history: History[];
  memory: number[];
  output: {
    expression: Expression;
    result: string;
    isFinish: boolean;
  };
}

const initialState: State = {
  history: [],
  memory: [],
  output: {
    expression: {
      a: "0",
      sign: "",
      b: "",
    },
    result: "",
    isFinish: false,
  },
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setPlusA(state, action: PayloadAction<string>) {
      if (state.output.expression.a === "0") {
        state.output.expression.a = action.payload;
      } else {
        state.output.expression.a += action.payload;
      }
    },
    setPlusB(state, action: PayloadAction<string>) {
      state.output.expression.b += action.payload;
    },
    setFixedA(state, action: PayloadAction<string>) {
      state.output.expression.a = action.payload;
    },
    setFixedB(state, action: PayloadAction<string>) {
      state.output.expression.b = action.payload;
    },
    setSign(state, action: PayloadAction<string>) {
      state.output.expression.sign = action.payload;
    },
    setResult(state, action: PayloadAction<string>) {
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
    CE() {
      return initialState;
    },
  },
});

export const {
  setPlusA,
  setPlusB,
  setFixedA,
  setFixedB,
  CE,
  setSign,
  setResult,
  setIsFinish,
  addToHistory,
  setFromHistory,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
