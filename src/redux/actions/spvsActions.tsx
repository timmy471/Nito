import { createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '@src/services/makeRequest';
import { displayAlert, formatUrl } from '@src/helpers';
import { ISPVQueryParam, ICurrentInvestmentData } from 'types';
import { setLoadingTrue, setLoadingFalse } from '../slices/spvSlice';

export const GetSPVs = createAsyncThunk(
  'spvs/get-spvs',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        spvs: { queryParams },
      } = getState() as { spvs: { queryParams: ISPVQueryParam } };

      dispatch(setLoadingTrue());
      const { data } = await makeRequest('get', formatUrl('/funds', queryParams));
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const GetFundInvestments = createAsyncThunk(
  'spvs/get-fund-investments',
  async (queryParams: { fundId?: string | string[] }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await makeRequest('get', formatUrl('/funds/investments', queryParams));
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ApproveFund = createAsyncThunk(
  'spvs/approve-fund',
  async (fundId: string | string[], { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoadingTrue());
      const { data } = await makeRequest('put', `/funds/approve/${fundId}`);
      displayAlert({ msg: 'Fund successfully approved', variant: 'success' });
      setTimeout(() => location.reload(), 1000);
      location.reload();
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(setLoadingFalse());
    }
  }
);

export const GetInvestmentDetail = createAsyncThunk(
  'spvs/get-investment-detail',
  async ({ investmentId }: { investmentId: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await makeRequest('get', `/funds/investments/${investmentId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ApproveInvestment = createAsyncThunk(
  'spvs/approve-investment',
  async ({ cb }: { cb: () => void }, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        spvs: { currentInvestmentData },
      } = getState() as { spvs: { currentInvestmentData: ICurrentInvestmentData } };

      const { data } = await makeRequest(
        'put',
        `/funds/investments/approve/${currentInvestmentData?.currentInvestment?.id}`
      );
      displayAlert({ msg: 'Investment Approved successfully', variant: 'success' });
      cb();
      return data.data;
    } catch (error) {
      dispatch(setLoadingFalse());
      return rejectWithValue(error);
    }
  }
);

export const ConfirmInvestmentWire = createAsyncThunk(
  'spvs/confirm-investment-wire',
  async ({ cb }: { cb: () => void }, { dispatch, getState, rejectWithValue }) => {
    try {
      const {
        spvs: { currentInvestmentData },
      } = getState() as { spvs: { currentInvestmentData: ICurrentInvestmentData } };
      const { data } = await makeRequest(
        'put',
        `/funds/investments/confirm-wire-transfer/${currentInvestmentData?.currentInvestment?.id}`
      );
      displayAlert({ msg: 'Wire Confirmed successfully', variant: 'success' });
      cb();
      return data.data;
    } catch (error) {
      dispatch(setLoadingFalse());
      return rejectWithValue(error);
    }
  }
);
