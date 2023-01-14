import { IDashboardInitialState } from 'types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IDashboardInitialState = {
  error: null,
  loading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLoadingTrue, setLoadingFalse } = dashboardSlice.actions;

export default dashboardSlice.reducer;
