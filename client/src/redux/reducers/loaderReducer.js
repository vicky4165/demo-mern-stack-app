import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
  name: "loader",
  initialState: { value: false },
  reducers: {
    setIsLoading: (state, action) =>
      (state = { ...state, value: action.payload.isLoading }),
  },
});

export const { setIsLoading } = loaderSlice.actions;
export const isLoading = (state) => state.loader.value;
export default loaderSlice.reducer;
