import { createSlice } from '@reduxjs/toolkit';
import { userChats } from './msgThunk';

const msgSlice = createSlice({
    name:'msg',
    initialState: {
        users: [],
        loading: false,
        error: null,
      },
      reducers:{},
      extraReducers:(builder)=>{
         builder.addCase(userChats.fulfilled,(state, action) => {
           state.error = null;
           state.loading = false;
           state.users = action.payload
         })
         
         builder.addCase(userChats.pending,(state,action)=>{
           state.error = null;
           state.loading = true;
         })
         builder.addCase(userChats.rejected,(state,action)=>{
          state.error = action.error.message;
          state.loading = false;
        })
      }
})

export default msgSlice.reducer;