import { configureStore } from '@reduxjs/toolkit'
import userReducer from './modules/userStore.jsx' 

const store = configureStore({
  reducer: {
    user: userReducer 
  }
})

export default store
