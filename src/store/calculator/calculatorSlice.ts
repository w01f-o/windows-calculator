import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expression, History, Memory } from "@/types/calculator.types.ts";
import { v4 as uuid } from "uuid";

interface State {
  history: History[];
  memory: Memory[];
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
    clearOutput(state) {
      state.output = initialState.output;
    },
    clearAll() {
      return initialState;
    },
    addToMemory(state) {
      const { a, b, sign } = state.output.expression;
      const { result } = state.output;

      if (a !== null && b === null && result === null) {
        state.memory.push({
          value: Number(a),
          id: uuid(),
        });
      } else if (a !== null && b !== null && sign !== null && result === null) {
        state.memory.push({
          value: Number(b),
          id: uuid(),
        });
      } else {
        state.memory.push({
          value: Number(result),
          id: uuid(),
        });
      }
    },
    getFromMemory(state) {
      const { a, b, sign } = state.output.expression;
      const { result } = state.output;
      const lastMemoryValue = String(
        state.memory[state.memory.length - 1].value,
      );

      if (a !== null && b === null && result === null) {
        state.output.expression.a = lastMemoryValue;
      } else if (a !== null && b !== null && sign !== null && result === null) {
        state.output.expression.b = lastMemoryValue;
      } else {
        state.output.expression.a = lastMemoryValue;
        state.output.expression.b = null;
        state.output.result = null;
        state.output.isFinish = false;
      }
    },
    clearMemory(state, action: PayloadAction<Memory | undefined>) {
      if (!action.payload) {
        state.memory = initialState.memory;
      } else {
        state.memory = state.memory.filter(
          (item) => item.id !== action.payload!.id,
        );
      }
    },
    plusMinusToMemory(
      state,
      action: PayloadAction<{
        memory: Memory | undefined;
        operation: "M+" | "M-";
      }>,
    ) {
      const { a, b, sign } = state.output.expression;
      const { result } = state.output;
      const { operation } = action.payload;
      let itemIndex: number = state.memory.findIndex(
        (item) => item.id === action.payload.memory?.id,
      );

      if (itemIndex === -1) {
        itemIndex = state.memory.length - 1;
      }

      if (a !== null && b === null && result === null) {
        state.memory[itemIndex].value += operation === "M+" ? +a : +a * -1;
      } else if (a !== null && b !== null && sign !== null && result === null) {
        state.memory[itemIndex].value += operation === "M+" ? +b : +b * -1;
      } else {
        state.memory[itemIndex].value +=
          operation === "M+" ? result! : result! * -1;
      }
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
  addToMemory,
  getFromMemory,
  clearMemory,
  plusMinusToMemory,
  clearOutput,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
