import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  count: number;
}

const initialState: LoadingState = {
  count: 0,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    incrementLoading: (state) => {
      state.count += 1;
    },
    decrementLoading: (state) => {
      state.count = Math.max(0, state.count - 1);
    },
    resetLoading: (state) => {
      state.count = 0;
    },
  },
});

export const { incrementLoading, decrementLoading, resetLoading } =
  loadingSlice.actions;
export default loadingSlice.reducer;

