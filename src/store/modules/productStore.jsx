import { createSlice } from '@reduxjs/toolkit';
import mobileProducts from '../../config/Mobile.js'

const productStore = createSlice({
  name: 'products',
  initialState: {
    mobiles: mobileProducts,    
  },
  reducers: {
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
  }
});

export const { addMobile, updateMobile, deleteMobile  } = productStore.actions;
export default productStore.reducer;