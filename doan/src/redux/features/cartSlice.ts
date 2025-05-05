import URL_API from "@app-helper/urlAPI";
import useCallAPI from "@app-helper/useCallAPI";
import { saveObjectDataToStorage } from "@app-helper/useSaveDataToStorage";
import { CartFilterParams, CartItemUpdateData, CartProps, ProductCartData } from "@app-schemas/Cart/cart";
import { KEY_STORAGE } from "@app-services/service-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState: CartProps = {
  cartData: null,
  hasFetchedCartData: false,
  increaseProductQuantityInCartResponse: null,
  productCartListData: null,
  cartError: null,
  cartLoading: false
};

export const getCartData = createAsyncThunk(
  'post/cartData',
  async (token: string) => {
    const response = await useCallAPI({ method: 'POST', url: `${URL_API}get/user-cart-data`, token: token })
    return response
  }
)

export const getProductCartListData = createAsyncThunk(
  'post/productCartListData',
  async (data: CartFilterParams) => {
    const response = await useCallAPI({ method: 'POST', url: `${URL_API}get/cart-items-data`, data: data })
    return response
  }
)

export const addProductInCart = createAsyncThunk(
  'post/addProductInCart',
  async (data: ProductCartData) => {
    const response = await useCallAPI({ method: 'POST', url: `${URL_API}add-product-in-cart`, data: data })
    return response
  }
)

export const increaseProductQuantityInCart = createAsyncThunk(
  'post/addProductInCart',
  async (data: CartItemUpdateData) => {
    const response = await useCallAPI({ method: 'PUT', url: `${URL_API}increase-product-quantity-in-cart`, data: data })
    return response
  }
)



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetLoginResponse: (state) => {
      state.loginResponse = null
      state.authError = null,
        state.authLoading = false
    },
    resetRegisterResponse: (state) => {
      state.registerResponse = null
      state.authError = null,
        state.authLoading = false
    },
    resetAllAuth: (state) => {
      state.loginResponse = null
      state.registerResponse = null
      state.account = null,
        state.tokenData = null,
        state.authError = null,
        state.authLoading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.authLoading = false;
        if (action.payload && (action.payload.status === true || action.payload.status === false)) {
          state.loginResponse = action.payload;
        }
        else {
          state.loginResponse = undefined
        }
        if (action.payload && action.payload.status === true) {
          const data = {
            user_name: action.payload?.user_name,
            email: action.payload?.email,
            user_avatar: action.payload?.user_avatar,
            role: action.payload?.role
          }
          state.account = data;
          state.tokenData = action.payload.data.token
          saveObjectDataToStorage(KEY_STORAGE.ACCOUNT_DATA, data);
          saveObjectDataToStorage(KEY_STORAGE.USER_TOKEN, action.payload.data.token);
        }
        state.authError = null;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.error.message || 'Login failed';
      })

      .addCase(registerAccount.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.authLoading = false;
        if (action.payload && (action.payload.status === true || action.payload.status === false)) {
          state.registerResponse = action.payload;
        }
        else {
          state.loginResponse = undefined
        }
        if (action.payload && action.payload.status === true) {
          const data = {
            user_name: action.payload?.user_name,
            email: action.payload?.email,
            role: action.payload?.role
          }
          state.account = data;
          state.tokenData = action.payload.token
          saveObjectDataToStorage(KEY_STORAGE.ACCOUNT_DATA, data);
          saveObjectDataToStorage(KEY_STORAGE.USER_TOKEN, action.payload.token);
        }
        state.authError = null;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.error.message || 'Register failed';
      });
  }
});

export const { resetLoginResponse, resetAllAuth, resetRegisterResponse } = authSlice.actions;
export default authSlice.reducer;
