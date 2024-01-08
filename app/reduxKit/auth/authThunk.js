import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      form_data.append('faceId', {
        uri: faceId,
        name: 'photo.jpg',
        type: 'image/jpg',
      });

      const { data } = await axios.post('auth/signup', form_data, config);
      return data;
    } catch (error) {
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
      form_data.append('faceId', {
        uri: faceId,
        name: 'photo.jpg',
        type: 'image/jpg',
      });

      const { data } = await axios.post('auth/loginWithFaceID', form_data, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginWithEmailPassword = createAsyncThunk(
  'auth/loginWithEmailPassword',
  async ({ email, password }, thunkAPI) => {
    try {
      let obj = { email, password };
      const { data } = await axios.post('auth/loginWithEmailPassword', obj);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
