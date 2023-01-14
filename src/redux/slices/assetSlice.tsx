import { createSlice } from '@reduxjs/toolkit';
import { IAssetInitialState, IAssetQueryParam } from 'types';
import { GetAssets, HandleAssetPublish } from '../actions/assetActions';

const initialState: IAssetInitialState = {
  assets: null,
  count: 0,
  queryParams: {
    status: '',
    searchFilter: '',
    cursor: '',
  },
  error: null,
  loading: false,
  currentAsset: null,
  publishAsset: {
    loading: false,
  },
};

const assetSlice = createSlice({
  name: 'assets',
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
      state.queryParams[payload.param as keyof IAssetQueryParam] = payload.value;
    },
    resetAssetState(state) {
      state = initialState;
    },
    setCurrentAsset(state, { payload }) {
      state.currentAsset = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAssets.fulfilled, (state, { payload }) => {
      state.loading = false;
      //Check if the asset is an array to determine initial load case
      if (state.queryParams.cursor && Array.isArray(state.assets)) {
        state.assets = [...state.assets, ...payload.assets];
      } else {
        state.assets = payload.assets;
      }
      (state.count = payload.count),
        (state.queryParams.cursor = payload.assets[payload.assets.length - 1]?.id);
    });

    builder.addCase(HandleAssetPublish.pending, (state) => {
      state.publishAsset.loading = true;
    });

    builder.addCase(HandleAssetPublish.fulfilled, (state, { payload }) => {
      state.publishAsset.loading = false;
      state.assets = payload.newAssets;
      if (payload.currentAsset) state.currentAsset = payload.currentAsset;
    });

    builder.addCase(HandleAssetPublish.rejected, (state) => {
      state.publishAsset.loading = false;
    });
  },
});

export const {
  setLoadingTrue,
  setLoadingFalse,
  setQueryParam,
  resetAssetState,
  setCurrentAsset,
} = assetSlice.actions;

export default assetSlice.reducer;
