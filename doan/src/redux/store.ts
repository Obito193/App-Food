import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import productListReducer from './features/productListSlice';


const store = configureStore({
  reducer: {
   auth: authReducer,
   productList: productListReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
