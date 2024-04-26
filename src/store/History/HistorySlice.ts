import { createSlice } from "@reduxjs/toolkit";

export const HistorySlice = createSlice({
  name: "history",
  initialState: {
    history: [],
  },
  reducers: {},
});

export default HistorySlice.reducer;
