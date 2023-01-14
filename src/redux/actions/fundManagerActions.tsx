import {
  setFMLoadingTrue,
  setFMLoadingFalse,
  setSelectedFMLoadingTrue,
} from '@src/redux/slices/fundManagerSlice';
import { IFMQueryParam } from 'types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '@src/services/makeRequest';
import { displayAlert, formatUrl } from '@src/helpers';

/* Get statistics for fund manager */
export const GetFundManagerStats = createAsyncThunk(
  'GET_FUND_MANAGER_STATS',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await makeRequest('get', '/users/fund-managers/stats');
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/* Get list of fund managers */
export const GetFundManagersList = createAsyncThunk(
  'GET_FUND_MANAGER_LIST',
  async (_, { rejectWithValue, dispatch, getState }) => {
    dispatch(setFMLoadingTrue());
    try {
      const {
        fundmanager: { queryParams },
      } = getState() as { fundmanager: { queryParams: IFMQueryParam } };
      const { data } = await makeRequest(
        'get',
        formatUrl('/users/fund-managers', queryParams)
      );
      return data;
    } catch (error) {
      dispatch(setFMLoadingFalse());
      return rejectWithValue(error);
    }
  }
);

export const SetFmSearchQuery = createAsyncThunk(
  'SET_FM_SEARCH_QUERY',
  async (search: string) => {
    return search;
  }
);
/* Clear the list of fund managers */
export const ClearFundManagersList = createAsyncThunk(
  'CLEAR_FUND_MANAGER_LIST_PAGINATED',
  async () => {}
);

/* Get fund manager detail by ID */
export const GetFundManagersDetail = createAsyncThunk(
  'GET_FUND_MANAGER_DETAIL',
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(setSelectedFMLoadingTrue());
    try {
      const { data } = await makeRequest('get', `/users/fund-managers/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/* Approve Fund Manager */
export const ApproveFundManager = createAsyncThunk(
  'APPROVE_FUND_MANAGER',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await makeRequest('put', `/users/fund-managers/approve/${id}`);
      displayAlert({
        msg: 'Fund Manager Approved Succesfully',
        variant: 'success',
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
