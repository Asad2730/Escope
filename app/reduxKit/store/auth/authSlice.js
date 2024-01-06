// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginWithFaceID, signUp, loginWithEmailPassword } from './authThunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginWithFaceID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithFaceID.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginWithFaceID.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(loginWithEmailPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginWithEmailPassword.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default authSlice.reducer;
