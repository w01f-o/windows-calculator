import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  history: number[];
  memory: number[];
  output: {
    expression: {
      a: string;
      sign: string;
      b: string;
    };
    result: number;
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
    setA(state, action: PayloadAction<string>) {
      if (state.output.expression.a === "0") {
        state.output.expression.a = action.payload;
      } else {
        state.output.expression.a += action.payload;
      }
    },
    setB(state, action: PayloadAction<string>) {
      state.output.expression.b += action.payload;
    },
    setSign(state, action: PayloadAction<string>) {
      state.output.expression.sign = action.payload;
    },
    setResult(state, action: PayloadAction<string>) {
      state.output.result = action.payload;
    },
    CE() {
      return initialState;
    },
  },
});

export const { setA, setB, CE, setSign, setResult } = calculatorSlice.actions;

export default calculatorSlice.reducer;
