import { createSlice } from "@reduxjs/toolkit";

export const MemorySlice = createSlice({
  name: "memory",
  initialState: {
    memory: [],
  },
  reducers: {},
});

export default MemorySlice.reducer;
