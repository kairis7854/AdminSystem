import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/userStore.jsx' 
import productReducer from './modules/productStore.jsx'

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer 
  }
})

export default store
