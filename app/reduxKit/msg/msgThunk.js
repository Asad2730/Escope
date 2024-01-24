import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { db_url } from '../../utils/helpers';


export const userChats = createAsyncThunk(
    'msg/userChats',
    async({email},thunkAPI)=> {
        try{
          let { data } = await axios.get(`${db_url}/userChats/${email}`)
          thunkAPI.dispatch(userChats.fulfilled(data))
          return data
        }catch(error){
            thunkAPI.dispatch(userChats.rejected(error))
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)