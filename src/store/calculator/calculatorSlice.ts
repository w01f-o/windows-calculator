import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expression, History, Memory } from "@/types/calculator.types.ts";
import { v4 as uuid } from "uuid";
import {
  basicOperationList,
  digitList,
  otherOperationList,
} from "@/components/Calculator/Keyboard/keys/keys.ts";

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
    keyboardClickHandler(state, action: PayloadAction<string>) {
      const { isError, isFinish, result } = state.output;
      const { a, b, sign } = state.output.expression;
      const key = action.payload;

      const clearAll = () => {
        state.output = initialState.output;
        state.history = initialState.history;
        state.memory = initialState.memory;
      };

      const clearOutput = ({ isError }: { isError: boolean }) => {
        state.output = isError
          ? { ...initialState.output, isError: true }
          : initialState.output;
      };

      if (isError) {
        clearOutput({ isError: false });
        return;
      }

      if (digitList.includes(key)) {
        if (!b && !sign) {
          if (a?.split('').includes('.') && key === ".") return

          a === "0" && key !== "."
            ? (state.output.expression.a = key)
            : (state.output.expression.a += key);
        } else if (a && b && isFinish && result) {
                    state.output.expression.a = String(result);
          state.output.expression.b = String(key);
          state.output.isFinish = false;
        } else {
          if (!b) {
            state.output.expression.b = key === "." ? "0." : key;
          } else if (b === "0" && key !== ".") {
            state.output.expression.b = key;
          } else {
            if (b.split('').includes('.') && key === ".") return;

            state.output.expression.b += key;
          }
        }
      }

      if (basicOperationList.includes(key)) {
        if (isFinish) {
          state.output.expression.a = String(result);
          state.output.expression.b = null;
          state.output.result = null;
          state.output.isFinish = false;
        }
        if (a!.split('')[a!.length - 1] === ".") {
          state.output.expression.a = a!.slice(0, -1);
        }

        state.output.expression.sign = key;
      }

      if (key === "CE") {
        clearAll();
      }

      if (key === "C") {
        clearOutput({ isError: false });
      }

      const updateValue = (operation: (value: number) => number | string) => {
        const checkForFinite = (num: number | string, setState: () => void) => {
          if (isFinite(+num)) {
            setState();
          } else {
            clearOutput({ isError: true });
          }
        };

        if (a && !b && !result) {
          const tempA = operation(+a);

          checkForFinite(tempA, () => {
            state.output.expression.a = String(tempA);
          });
        } else if (a && b && sign && !result) {
          const tempB = operation(+b);

          checkForFinite(tempB, () => {
            state.output.expression.b = String(tempB);
          });
        } else {
          const tempResult = operation(result!);

          checkForFinite(tempResult, () => {
            state.output.expression.a = String(tempResult);
            state.output.expression.b = null;
            state.output.result = null;
            state.output.isFinish = false;
          });
        }
      };

      if (otherOperationList.includes(key)) {
        switch (key) {
          case "%":
            updateValue((value) => value / 100);
            break;
          case "1/x":
            updateValue((value) => 1 / value);
            break;
          case "x²":
            updateValue((value) => value * value);
            break;
          case "+/-":
            updateValue((value) => value * -1);
            break;
          case "²√x":
            updateValue((value) => Math.sqrt(value));
            break;
          case "⌫":
            updateValue((value) => String(value).slice(0, -1));
            break;
          default:
            break;
        }
      }

      if (key === "=") {
        if (b?.split('')[b?.length - 1] === ".") {
          state.output.expression.b = b?.slice(0, -1);
        }

        if (!sign && !isFinish) return;

        state.output.isFinish = true;

        let tempA = a;
        let tempB = state.output.expression.b;

        if (isFinish && result) {
          tempA = String(result);
          state.output.expression.a = tempA;
        }

        if (!b) {
          tempB = a;
          state.output.expression.b = tempB;
        }

        switch (sign) {
          case "+":
            state.output.result = Number(tempA) + Number(tempB);
            break;
          case "-":
            state.output.result = Number(tempA) - Number(tempB);
            break;
          case "x":
            state.output.result = Number(tempA) * Number(tempB);
            break;
          case "/":
            if (tempB === "0") {
              clearOutput({ isError: true });
            } else {
              state.output.result = Number(tempA) / Number(tempB);
            }
            break;
          default:
            break;
        }
      }
    },
    addToHistory(state) {
      const { result } = state.output;
      const { a, b, sign } = state.output.expression;

      if (result) {
        state.history.push({ expression: { a, b, sign }, result, id: uuid() });
      }
    },
    setFromHistory(state, action: PayloadAction<History>) {
      state.output.expression = action.payload.expression;
      state.output.result = action.payload.result;
    },
    addToMemory(state) {
      const { a, b, sign } = state.output.expression;
      const { result } = state.output;

      let pushedValue: number;

      if (a && !b && !result) {
        pushedValue = Number(a);
      } else if (a && b && sign && !result) {
        pushedValue = Number(b);
      } else {
        pushedValue = result!;
      }

      state.memory.push({
        value: Number(pushedValue),
        id: uuid(),
      });
    },
    getFromMemory(state) {
      const { a, b, sign } = state.output.expression;
      const { result } = state.output;
      const lastMemoryValue = String(
        state.memory[state.memory.length - 1].value,
      );

      if (a && !b && !result) {
        state.output.expression.a = lastMemoryValue;
      } else if (a && b && sign && !result) {
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

      let temp: number;

      if (a && !b && !result) {
        temp = Number(a);
      } else if (a && b && sign && !result) {
        temp = Number(b);
      } else {
        temp = result!;
      }

      state.memory[itemIndex].value += operation === "M+" ? +temp : +temp * -1;
    },
  },
});

export const {
  addToHistory,
  setFromHistory,
  addToMemory,
  getFromMemory,
  clearMemory,
  plusMinusToMemory,
  keyboardClickHandler,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
