import { createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '@src/services/makeRequest';
import { setLoadingTrue } from '../slices/dashboardSlice';

export const GetDashboardStats = createAsyncThunk(
  'dashboard/get-dashboard-data',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoadingTrue());
      const { data } = await makeRequest('get', '/dashboard');
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
