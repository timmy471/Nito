import { createSlice } from '@reduxjs/toolkit';
import { ILPInitialState, ILPQueryParam } from 'types';
import { ClearLpList, GetLPDetail, GetLpList, GetLPStats } from '@src/redux/actions/lpActions';

const initialState: ILPInitialState = {
  loading: false,
  lp: {
    lps: null,
    count: 0,
  },
  selectedLP: {
    loading: false,
    data: {},
  },
  statistics: {
    totalLps: 0,
    totalSyndicates: 0,
    activeLps: 0,
  },
  queryParams: {
    searchFilter: '',
    cursor: '',
  },
};

const lpSlice = createSlice({
  name: 'lps',
  initialState,
  reducers: {
    setLPLoadingTrue(state) {
      state.loading = true;
    },
    setLPLoadingFalse(state) {
      state.loading = false;
    },
    setSelectedLPLoadingTrue(state) {
      state.selectedLP.loading = true;
    },
    setQueryParam(state, { payload }) {
      state.queryParams.cursor = '';
      state.queryParams[payload.param as keyof ILPQueryParam] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetLPStats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statistics = payload?.data;
    });
    builder.addCase(GetLpList.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (state.queryParams.cursor && Array.isArray(state.lp.lps)) {
        state.lp.lps = [...state?.lp?.lps, ...payload?.data?.lps];
      } else {
        state.lp.lps = [...payload?.data?.lps];
      }
      state.lp.count = payload?.data?.count;
      state.queryParams.cursor = payload.data.lps[payload.data.lps.length - 1]?.id;
    });
    builder.addCase(ClearLpList.fulfilled, (state) => {
      state.loading = false;
      state.lp = {
        lps: [],
        count: 0,
      };
    });
    builder.addCase(GetLPDetail.fulfilled, (state, { payload }) => {
      state.selectedLP = {
        loading: false,
        data: payload?.data,
      };
    });
  },
});

export const { setLPLoadingTrue, setLPLoadingFalse, setSelectedLPLoadingTrue, setQueryParam } =
  lpSlice.actions;

export default lpSlice.reducer;
