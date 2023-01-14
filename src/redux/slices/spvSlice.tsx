import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ISPVSInitialState, ISPVQueryParam, IFund } from 'types';
import {
  ApproveInvestment,
  ConfirmInvestmentWire,
  GetFundInvestments,
  GetInvestmentDetail,
  GetSPVs,
} from '../actions/spvsActions';

const initialState: ISPVSInitialState = {
  spvs: null,
  count: 0,
  queryParams: {
    searchFilter: '',
    cursor: '',
    round: '',
  },
  lpsData: {
    loading: false,
    lps: null,
    cursor: '',
    count: 0,
  },
  currentInvestmentData: {
    loading: false,
    currentInvestment: null,
  },
  loading: false,
};

const spvsSlice = createSlice({
  name: 'spvs',
  initialState,
  reducers: {
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
    setQueryParam(state, { payload }) {
      state.queryParams.cursor = '';
      state.queryParams[payload.param as keyof ISPVQueryParam] = payload.value;
    },
    resetSPVsState(state) {
      state = initialState;
    },
    resetLPsState(state) {
      state.lpsData = {
        loading: false,
        lps: null,
        cursor: '',
        count: 0,
      };
    },
    clearInvestmentDetail(state) {
      state.currentInvestmentData = {
        loading: false,
        currentInvestment: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetSPVs.fulfilled, (state, { payload }) => {
      state.loading = false;
      //   Check if the spvs is an array to determine initial load case
      if (state.queryParams.cursor && Array.isArray(state.spvs)) {
        state.spvs = [...state.spvs, ...payload.funds];
      } else {
        state.spvs = payload.funds;
      }
      (state.count = payload.count),
        (state.queryParams.cursor = payload.funds[payload.funds.length - 1]?.id);
    });

    builder.addCase(GetFundInvestments.pending, (state) => {
      state.lpsData.loading = true;
    });

    builder.addCase(GetFundInvestments.fulfilled, (state, { payload }) => {
      state.lpsData.loading = false;
      state.lpsData.count = payload.count;
      state.lpsData.cursor = payload.invesments[payload.invesments.length - 1]?.id;

      if (state.lpsData.cursor && Array.isArray(state.lpsData.lps)) {
        state.lpsData.lps = [...state.lpsData.lps, ...payload.invesments];
      } else {
        state.lpsData.lps = payload.invesments;
      }
    });

    builder.addCase(GetInvestmentDetail.pending, (state) => {
      state.currentInvestmentData.loading = true;
    });
    builder.addCase(GetInvestmentDetail.fulfilled, (state, { payload }) => {
      (state.currentInvestmentData.loading = false),
        (state.currentInvestmentData.currentInvestment = payload);
    });
    builder.addCase(GetInvestmentDetail.rejected, (state) => {
      state.currentInvestmentData.loading = false;
    });

    builder.addMatcher(
      isAnyOf(ApproveInvestment.fulfilled, ConfirmInvestmentWire.fulfilled),

      (state, { payload }) => {
        if (state.lpsData?.lps?.length) {
          let newLPs = [...state.lpsData.lps];
          const index = newLPs.findIndex((o) => o.id === payload.id);
          newLPs[index].status = payload.status;
          state.lpsData.lps = newLPs;
        }
        state.loading = false;
      }
    );
  },
});

export const {
  setLoadingTrue,
  setLoadingFalse,
  setQueryParam,
  resetSPVsState,
  resetLPsState,
  clearInvestmentDetail,
} = spvsSlice.actions;

export default spvsSlice.reducer;
