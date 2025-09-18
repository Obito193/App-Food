import URL_API from "@app-helper/urlAPI";
import useCallAPI from "@app-helper/useCallAPI";
import { saveObjectDataToStorage } from "@app-helper/useSaveDataToStorage";
import { AuthProps, LoginSendData, RegisterSendData } from "@app-schemas/Auth/auth";
import { KEY_STORAGE } from "@app-services/service-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState: AuthProps = {
  loginResponse: null,
  registerResponse: null,
  account: null,
  tokenData: null,
  authError: null,
  authLoading: false
};

export const loginAccount = createAsyncThunk(
  'post/loginAccount',
  async (data: LoginSendData) => {
    const response = await useCallAPI({ method: 'POST', url: `${URL_API}login`, data: data, showToast: true })
    return response
  }
)

export const registerAccount = createAsyncThunk(
  'post/registerAccount',
  async (data: RegisterSendData) => {
    const response = await useCallAPI({ method: 'POST', url: `${URL_API}register`, data: data, showToast: true })
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
        if (action.payload && (action.payload.success == true || action.payload.success == false)) {     
          state.loginResponse = action.payload;
        }
        else {
          state.loginResponse = undefined
        }
        if (action.payload && action.payload.success === true) {
          const data = {
            user_name: action.payload?.user_name,
            email: action.payload?.email,
            user_avatar: action.payload?.user_avatar,
            role: action.payload?.role
          }
          state.account = data;
          state.tokenData = action.payload.token
          saveObjectDataToStorage(KEY_STORAGE.ACCOUNT_DATA, data);
          saveObjectDataToStorage(KEY_STORAGE.USER_TOKEN, action.payload.token);
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
        if (action.payload && (action.payload.success === true || action.payload.success === false)) {
          state.registerResponse = action.payload;
        }
        else {
          state.registerResponse = undefined
        }
        if (action.payload && action.payload.success === true) {
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
