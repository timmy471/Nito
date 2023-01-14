import { IAuthInitialState } from 'types';
import { createSlice } from '@reduxjs/toolkit';
import { UserLogin } from '../actions/authActions';
import { getStorageUser, isAuthenticated } from '@src/services';

const initialState: IAuthInitialState = {
  user: getStorageUser()?.user || {},
  isAuthenticated: !!isAuthenticated(),
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
  },
});

export const { setLoadingTrue, setLoadingFalse } = authSlice.actions;

export default authSlice.reducer;
