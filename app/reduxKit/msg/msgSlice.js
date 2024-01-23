import { createSlice } from '@reduxjs/toolkit';

const msgSlice = createSlice({
    name:'msg',
    initialState: {
        users: [],
        loading: false,
        error: null,
      },
      reducers:{},
      extraReducers:(builder)=>{

      }
})

export default msgSlice.reducer;