import { createSlice } from '@reduxjs/toolkit'

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    open: false, 
    title: "", 
    type: ""
  },
  reducers: {
    setSnackbarOptions: (state, action) => {
      state = { ...state, ...action.payload.options }
    }
  }
})

export const { setSnackbarOptions } = snackbarSlice.actions;
export const snackbarOptions = state => state.snackbar;

export default snackbarSlice.reducer