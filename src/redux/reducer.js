import { createSlice } from '@reduxjs/toolkit';

const stock = createSlice({
  name: 'stock',
  initialState: {
    user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
},
  reducers: {
    