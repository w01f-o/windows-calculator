import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  history: number[];
  memory: number[];
  output: string;
}

const initialState: State = {
  history: [],
  memory: [],
  output: "",
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setOutput: (state: State, action: PayloadAction<string>) => {
      state.output = action.payload;
    },
  },
});

export const { setOutput } = calculatorSlice.actions;

export default calculatorSlice.reducer;
