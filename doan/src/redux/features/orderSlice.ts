import URL_API from "@app-helper/urlAPI";
import useCallAPI from "@app-helper/useCallAPI";
import { CreateOrderDataSend, GetOrderFilterParams, GetOrderItemsFilterParams, OrderProps } from "@app-schemas/Order/order";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: OrderProps = {
  currentPagePaginationOrderListData: 1,
  hasFetchedPaginationOrderListData: false,
  hasMorePaginationOrderListData: true,
  paginationOrderListData: null,
  currentPagePaginationOrderItemsData: 1,
  hasFetchedPaginationOrderItemsData: false,
  hasMorePaginationOrderItemsData: true,
  paginationOrderItemsData: null,
  createOrderResponse: null,
  orderError: null,
  orderLoading: false
};

export const getOrderListData = createAsyncThunk(
  'get/orderData',
  async (data: GetOrderFilterParams) => {
    const response = await useCallAPI({
      method: 'POST',
      url: `${URL_API}get/order-data`,
      data: data,
      token: data.token
    })
    return response
  }
)

export const getOrderItemsData = createAsyncThunk(
  'get/orderItemsData',
  async (data: GetOrderItemsFilterParams) => {
    const response = await useCallAPI({
      method: 'POST',
      url: `${URL_API}get/order-items-data`,
      data: data,
    })
    return response
  }
)

export const createOrder = createAsyncThunk(
  'post/createData',
  async (data: CreateOrderDataSend) => {
    const response = await useCallAPI({
      method: 'POST',
      url: `${URL_API}create-order`,
      data: data.data,
      token: data.token
    })
    return response
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetAllOrderData: () => initialState,
    resetOrderListData: (state) => {
      state.currentPagePaginationOrderListData = 1,
        state.hasFetchedPaginationOrderListData = false,
        state.hasMorePaginationOrderListData = true,
        state.paginationOrderListData = null,
        state.orderError = null,
        state.orderLoading = false
    },
    resetOrderItemsData: (state) => {
      state.currentPagePaginationOrderItemsData = 1,
        state.hasFetchedPaginationOrderItemsData = false,
        state.hasMorePaginationOrderItemsData = true,
        state.paginationOrderItemsData = null,
        state.orderError = null,
        state.orderLoading = false
    },
    resetCreateOrderResponse: (state) => {
      state.createOrderResponse = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderListData.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(getOrderListData.fulfilled, (state, action) => {
        state.orderLoading = false;

        if (
          Array.isArray(action.payload.data) &&
          (action.payload.data).length >= 0 &&
          action.payload.success
        ) {
          state.hasMorePaginationOrderListData = (action.payload.data).length < 10 ? false : true
          state.paginationOrderListData =
            state.paginationOrderListData ?
              [...state.paginationOrderListData, ...action.payload.data] :
              action.payload.data
          state.currentPagePaginationOrderListData = state.currentPagePaginationOrderListData + 1
          state.hasFetchedPaginationOrderListData = true
        }

        state.orderError = null;
      })
      .addCase(getOrderListData.rejected, (state, action: PayloadAction<any>) => {
        state.orderLoading = false;
        state.orderError = action.payload || 'Failed';
      })

      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderLoading = false;

        if (
          action.payload.result &&
          action.payload.success
        ) {
          state.paginationOrderListData =
            state.paginationOrderListData ?
              [action.payload.result, ...state.paginationOrderListData] :
              [action.payload.result];
          state.createOrderResponse = action.payload
        }

        state.orderError = null;
      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
        state.orderLoading = false;
        state.orderError = action.payload || 'Failed';
      })

      .addCase(getOrderItemsData.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })
      .addCase(getOrderItemsData.fulfilled, (state, action) => {
        state.orderLoading = false;

        if (
          Array.isArray(action.payload.data) &&
          (action.payload.data).length >= 0 &&
          action.payload.success
        ) {
          state.hasMorePaginationOrderItemsData = (action.payload.data).length < 10 ? false : true
          state.paginationOrderItemsData =
            state.paginationOrderItemsData ?
              [...state.paginationOrderItemsData, ...action.payload.data] :
              action.payload.data
          state.currentPagePaginationOrderItemsData = state.currentPagePaginationOrderItemsData + 1
          state.hasFetchedPaginationOrderItemsData = true
        }

        state.orderError = null;
      })
      .addCase(getOrderItemsData.rejected, (state, action: PayloadAction<any>) => {
        state.orderLoading = false;
        state.orderError = action.payload || 'Failed';
      })
  }
});

export const {
  resetAllOrderData,
  resetOrderListData,
  resetOrderItemsData,
  resetCreateOrderResponse
} = orderSlice.actions;

export default orderSlice.reducer;
