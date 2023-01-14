import {
  ApproveFundManager,
  ClearFundManagersList,
  GetFundManagersDetail,
  GetFundManagersList,
  GetFundManagerStats,
} from '@src/redux/actions/fundManagerActions';
import { formatDate } from '@src/helpers';
import { IFundManager, IFundManagerSliceState, IFMQueryParam } from 'types';
import { createSlice } from '@reduxjs/toolkit';
import { kycStatuses } from '@src/helpers/constants';

const initialState: IFundManagerSliceState = {
  loading: false,
  fundmanager: {
    fundmanagers: null,
    count: 0,
  },
  selectedFundManager: {
    loading: false,
    approvingFundManager: false,
    data: {},
  },
  statistics: {
    totalFundManagers: 0,
    totalFundManagersPendingReview: 0,
    totalSyndicates: 0,
  },
  queryParams: {
    searchFilter: '',
    cursor: '',
  },
};

const formatFMData = (data: Array<IFundManager>) => {
  let FM: any = [];
  data.map((value: any) => {
    FM.push({
      id: value.id || '',
      name: `${value.firstName} ${value.lastName}` || '',
      createdAt: formatDate(value.createdAt, true) || '',
      email: value.email || '',
      kycStatus: value?.FundManagerKYC?.status || kycStatuses.registered,
      registeredAs: 'Fund Manager',
      avatar: value.avatar || '',
    });
  });
  return FM;
};

const fundManagerSlice = createSlice({
  name: 'fundmanager',
  initialState,
  reducers: {
    setFMLoadingTrue(state) {
      state.loading = true;
    },
    setFMLoadingFalse(state) {
      state.loading = false;
    },
    setSelectedFMLoadingTrue(state) {
      state.selectedFundManager.loading = true;
    },
    setQueryParam(state, { payload }) {
      state.queryParams.cursor = '';
      state.queryParams[payload.param as keyof IFMQueryParam] = payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetFundManagerStats.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.statistics = payload?.data;
    });
    builder.addCase(GetFundManagersList.fulfilled, (state, { payload }) => {
      state.loading = false;
      //Check if the fundmanagers is an array to determine initial load case
      if (state.queryParams.cursor && Array.isArray(state.fundmanager.fundmanagers)) {
        state.fundmanager.fundmanagers = [
          ...state.fundmanager.fundmanagers,
          ...formatFMData(payload?.data?.fundManagers),
        ];
      } else {
        state.fundmanager.fundmanagers = [...formatFMData(payload?.data?.fundManagers)];
      }
      (state.fundmanager.count = payload.data.count),
        (state.queryParams.cursor =
          payload.data.fundManagers[payload.data.fundManagers.length - 1]?.id);
    });

    builder.addCase(ClearFundManagersList.fulfilled, (state) => {
      state = initialState;
    });
    builder.addCase(GetFundManagersDetail.fulfilled, (state, { payload }) => {
      state.selectedFundManager = {
        loading: false,
        approvingFundManager: false,
        data: payload?.data,
      };
    });
    builder.addCase(ApproveFundManager.pending, (state) => {
      state.selectedFundManager.approvingFundManager = true;
    });
    builder.addCase(ApproveFundManager.fulfilled, (state, { payload }) => {
      if (Array.isArray(state.fundmanager.fundmanagers)) {
        const index = state.fundmanager.fundmanagers.findIndex(
          (o) => o.id === payload.data.id
        );
        state.selectedFundManager.approvingFundManager = false;
        state.fundmanager.fundmanagers[index].kycStatus = payload.data.FundManagerKYC.status;
        state.selectedFundManager.data = payload.data;
      }
    });
  },
});

export const { setFMLoadingTrue, setFMLoadingFalse, setSelectedFMLoadingTrue, setQueryParam } =
  fundManagerSlice.actions;

export default fundManagerSlice.reducer;
