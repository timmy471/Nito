import { IAssetQueryParam, IPublishAssetPayload, IAssetInitialState } from 'types';
import { formatUrl } from '@src/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '@src/services/makeRequest';
import { setLoadingTrue, setQueryParam } from '../slices/assetSlice';
import { displayAlert } from '@src/helpers';
import { INewAssetFounder } from 'types';
import UploadFile from '@src/helpers/UploadFile';

export const GetAssets = createAsyncThunk(
  'assets/get-assets',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        asset: { queryParams },
      } = getState() as { asset: { queryParams: IAssetQueryParam } };

      dispatch(setLoadingTrue());
      const { data } = await makeRequest('get', formatUrl('/assets', queryParams));
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const handleUploadError = () =>
  displayAlert({ msg: 'Something went wrong, please try again' });

const uploadFounderImages = async (founders: INewAssetFounder[]) => {
  return Promise.all(
    founders.map(async (founder) => {
      if (founder.image) {
        const { success, location } = await UploadFile(founder.image);
        if (success) {
          let newFounder = {
            name: founder.name,
            jobTitle: founder.jobTitle,
            imageUrl: location,
          };
          return newFounder;
        } else {
          return handleUploadError();
        }
      } else {
        return {
          name: founder.name,
          jobTitle: founder.jobTitle,
          imageUrl: null,
        };
      }
    })
  );
};

export const CreateAsset = createAsyncThunk(
  'assets/create-asset',
  async ({ payload, founders, cb }: any, { rejectWithValue }) => {
    try {
      const { logo } = payload;

      const { success, location } = await UploadFile(logo);
      if (success) {
        payload.logo = location;
      } else {
        return handleUploadError();
      }

      if (founders.length) {
        const newFounders = await uploadFounderImages(founders);
        payload.founders = newFounders;
      }

      delete payload.founder;
      const { data } = await makeRequest('post', '/assets', payload);
      cb();
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const HandleAssetPublish = createAsyncThunk(
  'assets/publish-assets',
  async (
    { mode, assetId, cb }: IPublishAssetPayload,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { data } = await makeRequest('put', `/assets/${mode}/${assetId}`);
      const { asset } = getState() as { asset: IAssetInitialState };

      displayAlert({ msg: `Asset ${mode}ed successfully`, variant: 'success' });

      //Close modal
      cb();

      //Reset the status so that data displayed is in sync
      dispatch(
        setQueryParam({
          param: 'status',
          value: '',
        })
      );

      if (Array.isArray(asset.assets)) {
        const assetIndex = asset?.assets?.findIndex(
          (assetToFind: any) => assetToFind?.id === assetId
        );

        if (assetIndex !== -1) {
          let newAssets = [...asset?.assets];
          newAssets[assetIndex] = data.data;
          return {
            newAssets,
            currentAsset: data.data,
          };
        }
      }

      return {
        newAssets: asset.assets,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
