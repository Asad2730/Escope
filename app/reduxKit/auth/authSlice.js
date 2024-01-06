
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
      .addMatcher(
        (action) => [loginWithFaceID.fulfilled, signUp.fulfilled, loginWithEmailPassword.fulfilled].includes(action.type),
        (state, action) => {
          state.user = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [loginWithFaceID.rejected, signUp.rejected, loginWithEmailPassword.rejected].includes(action.type),
        (state, action) => {
          state.error = action.error.message;
        }
      )
      .addMatcher(
        (action) => [loginWithFaceID.pending, signUp.pending, loginWithEmailPassword.pending].includes(action.type),
        (state) => { state.loading = true }
      )
  },
});

export default authSlice.reducer;
