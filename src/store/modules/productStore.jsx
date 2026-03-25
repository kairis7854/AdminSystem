import { createSlice } from '@reduxjs/toolkit';
import mobileProducts from '../../config/Mobile.js'
import computerProducts from '../../config/computer.js'

const productStore = createSlice({
  name: 'products',
  initialState: {
    mobiles: mobileProducts,
    computers: computerProducts,
  },
  reducers: {
    //手機
    addMobile: (state, action) => {
      state.mobiles.push(action.payload);
    },
    updateMobile: (state, action) => {
      const index = state.mobiles.findIndex(m => m.id === action.payload.id);
      if (index !== -1) state.mobiles[index] = { ...state.mobiles[index], ...action.payload };
    },
    deleteMobile: (state, action) => {
      state.mobiles = state.mobiles.filter(m => m.id !== action.payload);
    },

    //電腦
    addComputer: (state, action) => {
      state.computers.push(action.payload);
    },
    updateComputer: (state, action) => {
      const index = state.computers.findIndex(m => m.id === action.payload.id);
      if (index !== -1) state.computers[index] = { ...state.computers[index], ...action.payload }
    },
    deleteCompunter: (state, action) => {
      state.computers = state.computers.filter(m => m.id !== action.payload);
    }
  }
});

export const { addMobile, updateMobile, deleteMobile, addComputer, updateComputer, deleteCompunter } = productStore.actions;
export default productStore.reducer;