import URL_API from "@app-helper/urlAPI";
import useCallAPI from "@app-helper/useCallAPI";
import { saveObjectDataToStorage } from "@app-helper/useSaveDataToStorage";
import { calculateTotalPrice } from "@app-helper/utilities";
import { CartFilterParams, CartItemUpdateData, CartProps, ProductCartData } from "@app-schemas/Cart/cart";
import { KEY_STORAGE } from "@app-services/service-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartProps = {
  cartData: null,
  hasFetchedCartData: false,
  increaseProductQuantityInCartResponse: null,
  productCartListData: null,
  currentPageProductCartListData: 1,
  hasFetchedProductCartListData: false,
  hasMoreProductCartListData: true,
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
    const response = await useCallAPI({ method: 'POST', url: `${URL_API}add-product-in-cart`, data: data, showToast: true })
    return response
  }
)

export const removeProductInCart = createAsyncThunk(
  'delete/removeProductInCart',
  async ({ product_id, cart_id }: { product_id: string | number, cart_id: number | string }) => {
    const response = await useCallAPI({ method: 'DELETE', url: `${URL_API}remove-product-in-cart`, data: { product_id, cart_id }, showToast: true })
    return response
  }
)

export const increaseProductQuantityInCart = createAsyncThunk(
  'put/increaseProductQuantityInCart',
  async (data: CartItemUpdateData) => {
    const response = await useCallAPI({ method: 'PUT', url: `${URL_API}increase-product-quantity-in-cart`, data: data, showToast: true })
    return response
  }
)




const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetAllCart: () => initialState,
    resetCartData: (state) => {
      state.cartData = null,
        state.hasFetchedCartData = false
      state.cartError = null
      state.cartLoading = false
    },
    resetProductCartListData: (state) => {
      state.productCartListData = null,
        state.currentPageProductCartListData = 1,
        state.hasFetchedProductCartListData = false,
        state.hasMoreProductCartListData = true,
        state.cartError = null
      state.cartLoading = false
    },
    resetIncreaseProductQuantityInCartResponse: (state) => {
      state.increaseProductQuantityInCartResponse = null
      state.cartError = null
      state.cartLoading = false
    },
    updateQuantityOfProductInCart: (state, action) => {
      if (
        action.payload &&
        state.productCartListData &&
        Array.isArray(state.productCartListData) &&
        state.productCartListData.length > 0
      ) {
        const product = state.productCartListData.find(
          (item) => item?.product_id == action.payload?.product_id
        );
        if (product) {
          product.quantity = action.payload.quantity;
          product.total_price = action.payload.total_price;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.cartLoading = false;
        if (action.payload && action.payload.success && action.payload?.result) {
          state.cartData = action.payload.result;
          state.hasFetchedCartData = true
        }
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.error.message || 'Get cart failed';
      })

      .addCase(increaseProductQuantityInCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(increaseProductQuantityInCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        if (action.payload) {
          state.increaseProductQuantityInCartResponse = action.payload;
        }
      })
      .addCase(increaseProductQuantityInCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.error.message || 'Get cart failed';
      })

      .addCase(removeProductInCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(removeProductInCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        if (action.payload && action.payload.success && action.payload?.response) {
          if (state.productCartListData && Array.isArray(state.productCartListData) && state.productCartListData.length > 0) {
            state.productCartListData = state.productCartListData.filter(
              (item) => item?.product_id != action.payload?.response?.product_id
            );
          }
        }
      })
      .addCase(removeProductInCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.error.message || 'Get cart failed';
      })

      .addCase(addProductInCart.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(addProductInCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        if (action.payload && action.payload.success && action.payload?.response) {
          if (state.productCartListData && Array.isArray(state.productCartListData) && state.productCartListData.length > 0) {
            const index = state.productCartListData.findIndex(
              (item) => item?.product_id == action.payload?.response.product_id
            );
            if (index !== -1) {
              state.productCartListData[index] = action.payload?.response;
            } else {
              state.productCartListData = null,
                state.currentPageProductCartListData = 1,
                state.hasFetchedProductCartListData = false,
                state.hasMoreProductCartListData = true
            }
          }
        }
      })
      .addCase(addProductInCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.error.message || 'Get cart failed';
      })

      .addCase(getProductCartListData.pending, (state) => {
        state.cartLoading = true;
        state.cartError = null;
      })
      .addCase(getProductCartListData.fulfilled, (state, action) => {
        state.cartLoading = false;
        if
          (action.payload &&
          action.payload.success &&
          Array.isArray(action.payload?.data) &&
          action.payload?.data?.length > 0
        ) {
          state.hasMoreProductCartListData = action.payload?.data?.length < 10 ? false : true
          state.productCartListData = state.productCartListData ? [...state.productCartListData, ...action.payload?.data] : action.payload?.data
          state.currentPageProductCartListData += 1
          state.hasFetchedProductCartListData = true
        }
      })
      .addCase(getProductCartListData.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = action.error.message || 'Get Data failed';
      })
  }
});

export const { resetAllCart, resetCartData, resetIncreaseProductQuantityInCartResponse, resetProductCartListData, updateQuantityOfProductInCart } = cartSlice.actions;
export default cartSlice.reducer;
