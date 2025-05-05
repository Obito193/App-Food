import URL_API from "@app-helper/urlAPI";
import useCallAPI from "@app-helper/useCallAPI";

import { ProductListProps, FilterParams } from "@app-schemas/Product/product-list";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: ProductListProps = {
  paginationProductTypeAll: null,
  paginationProductTypeFastProduct: null,
  paginationProductTypeDrinks: null,
  paginationProductTypeSnacks: null,
  hasFetchedPaginationProductTypeAll: false,
  hasFetchedPaginationProductTypeFastProduct: false,
  hasFetchedPaginationProductTypeDrinks: false,
  hasFetchedPaginationProductTypeSnacks: false,
  hasMorePaginationProductTypeAll: true,
  hasMorePaginationProductTypeFastProduct: true,
  hasMorePaginationProductTypeDrinks: true,
  hasMorePaginationProductTypeSnacks: true,
  currentPagePaginationProductTypeAll: 1,
  currentPagePaginationProductTypeFastProduct: 1,
  currentPagePaginationProductTypeDrinks: 1,
  currentPagePaginationProductTypeSnacks: 1,
  productListError: null,
  productListLoading: false
};

export const getProductData = createAsyncThunk(
  'get/productData',
  async (data: FilterParams) => {
    const response = await useCallAPI({ method: 'POST', url: `${URL_API}product`, data: data })
    return response
  }
)

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    resetAllProductListData: (state) => {
      state.paginationProductTypeAll = null,
        state.paginationProductTypeFastProduct = null,
        state.paginationProductTypeDrinks = null,
        state.paginationProductTypeSnacks = null,
        state.hasFetchedPaginationProductTypeAll = false,
        state.hasFetchedPaginationProductTypeFastProduct = false,
        state.hasFetchedPaginationProductTypeDrinks = false,
        state.hasFetchedPaginationProductTypeSnacks = false,
        state.hasMorePaginationProductTypeAll = true,
        state.hasMorePaginationProductTypeFastProduct = true,
        state.hasMorePaginationProductTypeDrinks = true,
        state.hasMorePaginationProductTypeSnacks = true,
        state.currentPagePaginationProductTypeAll = 1,
        state.currentPagePaginationProductTypeFastProduct = 1,
        state.currentPagePaginationProductTypeDrinks = 1,
        state.currentPagePaginationProductTypeSnacks = 1,
        state.productListError = null,
        state.productListLoading = false
    },
    resetProductTypeAll : (state) => {
      state.paginationProductTypeAll = null;
      state.hasFetchedPaginationProductTypeAll = false;
      state.hasMorePaginationProductTypeAll = true;
      state.currentPagePaginationProductTypeAll = 1;
    },
    resetProductTypeDrinks : (state) => {
      state.paginationProductTypeDrinks = null;
      state.hasFetchedPaginationProductTypeDrinks = false;
      state.hasMorePaginationProductTypeDrinks = true;
      state.currentPagePaginationProductTypeDrinks = 1;
    },
    resetProductTypeSnacks : (state) => {
      state.paginationProductTypeSnacks = null;
      state.hasFetchedPaginationProductTypeSnacks = false;
      state.hasMorePaginationProductTypeSnacks = true;
      state.currentPagePaginationProductTypeSnacks = 1;
    },
    resetProductListStatus : (state) => {
      state.productListError = null;
      state.productListLoading = false;
    }    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductData.pending, (state) => {
        state.productListLoading = true;
        state.productListError = null;
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        state.productListLoading = false;

        const { type, limit } = action.meta.arg || {}

        if (
          type === 'all' &&
          (action.payload)
        ) {
          if (
            Array.isArray(action.payload.data) &&
            (action.payload.data).length >= 0 &&
            action.payload.success
          ) {
            state.hasMorePaginationProductTypeAll = (action.payload.data).length < limit ? false : true
            state.paginationProductTypeAll =
              state.paginationProductTypeAll ?
                [...state.paginationProductTypeAll, ...action.payload.data] :
                action.payload.data
            state.currentPagePaginationProductTypeAll = state.currentPagePaginationProductTypeAll + 1
            state.hasFetchedPaginationProductTypeAll = true
          }
        } else if (
          type === 'snacks' &&
          (action.payload)
        ) {
          if (Array.isArray(action.payload.data) &&
            (action.payload.data).length >= 0 &&
            action.payload.success
          ) {
            state.hasMorePaginationProductTypeSnacks = (action.payload.data).length < limit ? false : true
            state.paginationProductTypeSnacks =
              state.paginationProductTypeSnacks ?
                [...state.paginationProductTypeSnacks, ...action.payload.data] :
                action.payload.data
            state.currentPagePaginationProductTypeSnacks = state.currentPagePaginationProductTypeSnacks + 1
            state.hasFetchedPaginationProductTypeSnacks = true
          }

        } else if (
          type === 'fast_food' &&
          (action.payload)
        ) {
          if (Array.isArray(action.payload.data) &&
            (action.payload.data).length >= 0 &&
            action.payload.success
          ) {
            state.hasMorePaginationProductTypeFastProduct = (action.payload.data).length < limit ? false : true
            state.paginationProductTypeFastProduct =
              state.paginationProductTypeFastProduct ?
                [...state.paginationProductTypeFastProduct, ...action.payload.data] :
                action.payload.data
            state.currentPagePaginationProductTypeFastProduct = state.currentPagePaginationProductTypeFastProduct + 1
            state.hasFetchedPaginationProductTypeFastProduct = true
          }
        } else if (
          type === 'drinks' &&
          (action.payload)
        ) {
          if (Array.isArray(action.payload.data) &&
            (action.payload.data).length >= 0 &&
            action.payload.success
          ) {
            state.hasMorePaginationProductTypeDrinks = (action.payload.data).length < limit ? false : true
            state.paginationProductTypeDrinks =
              state.paginationProductTypeDrinks ?
                [...state.paginationProductTypeDrinks, ...action.payload.data] :
                action.payload.data
            state.currentPagePaginationProductTypeDrinks = state.currentPagePaginationProductTypeDrinks + 1
            state.hasFetchedPaginationProductTypeDrinks = true
          }
        }
        state.productListError = null;
      })
      .addCase(getProductData.rejected, (state, action: PayloadAction<any>) => {
        state.productListLoading = false;
        state.productListError = action.payload || 'Failed to fetch get transit tickets details';
      })
  }
});

export const {
  resetAllProductListData,
  resetProductListStatus,
  resetProductTypeAll,
  resetProductTypeDrinks,
  resetProductTypeSnacks
} = productListSlice.actions;

export default productListSlice.reducer;
