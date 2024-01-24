import { createSlice } from '@reduxjs/toolkit';
import { loginWithFaceID, signUp, loginWithEmailPassword } from './authThunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.error = null;
      state.loading = false;
      state.user =null;
  },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithEmailPassword.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    })
    builder.addCase(loginWithFaceID.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    })

    builder.addCase(loginWithEmailPassword.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(loginWithFaceID.pending, (state, action) => {
      state.loading = true;;
    })
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(loginWithEmailPassword.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    builder.addCase(loginWithFaceID.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })

  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
