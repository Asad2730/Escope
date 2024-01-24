import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { db_url } from '../../utils/helpers';


const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};


export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, faceId }, thunkAPI) => {
    try {

      let form_data = new FormData();

      form_data.append('email', email);
      form_data.append('password', password);
      form_data.append('face_id', {
        uri: faceId,
        name: `${email}.jpg`,
        type: 'image/jpg',
      });
    
      const { data } = await axios.post(`${db_url}/createUser`, form_data, config);
      thunkAPI.dispatch(signUp.fulfilled(data));
      return data;
    } catch (error) {
      thunkAPI.dispatch(signUp.rejected(error));
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginWithFaceID = createAsyncThunk(
  'auth/loginWithFaceID',
  async ({ email, faceId }, thunkAPI) => {
    try {
      let form_data = new FormData();
      form_data.append('email', email);
      form_data.append('face_id', {
        uri: faceId,
        name: `${email}.jpg`,
        type: 'image/jpg',
      });

      const { data } = await axios.post(`${db_url}/LoginWithFaceID`, form_data, config);
      thunkAPI.dispatch(loginWithFaceID.fulfilled(data));
      return data;
    } catch (error) {
      thunkAPI.dispatch(loginWithFaceID.rejected(error));
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginWithEmailPassword = createAsyncThunk(
  'auth/loginWithEmailPassword',
  async ({ email, password }, thunkAPI) => {
    try {
      let obj = { email, password };
      const { data } = await axios.post(`${db_url}/LoginWithEmailPassword`, obj);
      thunkAPI.dispatch(loginWithEmailPassword.fulfilled(data));
      return data;
    } catch (error) {
      thunkAPI.dispatch(loginWithEmailPassword.rejected(error));
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
