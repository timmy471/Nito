import { ILPQueryParam } from 'types';
import { formatUrl } from '@src/helpers';
import makeRequest from '@src/services/makeRequest';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLPLoadingTrue, setSelectedLPLoadingTrue } from '@src/redux/slices/lpSlice';

/* Get statistics for LP */
export const GetLPStats = createAsyncThunk('GET_LP_STATS', async () => {
  try {
    const { data } = await makeRequest('get', '/funds/lps/stats');
    return data;
  } catch (error) {}
});

/* Get list of LPs */
export const GetLpList = createAsyncThunk(
  'GET_LP_LIST',
  async (_, { dispatch, getState, rejectWithValue }) => {
    dispatch(setLPLoadingTrue());
    try {
      const {
        lp: { queryParams },
      } = getState() as { lp: { queryParams: ILPQueryParam } };
      const { data } = await makeRequest('get', formatUrl('/funds/lps', queryParams));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const SetSearchQuery = createAsyncThunk('SET_SEARCH_QUERY', async (search: string) => {
  return search;
});

/* Clear the list of LPs */
export const ClearLpList = createAsyncThunk('CLEAR_LP_LIST_PAGINATED', async () => {});

/* Get lp detail by ID */
export const GetLPDetail = createAsyncThunk(
  'GET_LP_DETAIL',
  async (id: string, { dispatch, rejectWithValue }) => {
    dispatch(setSelectedLPLoadingTrue());
    try {
      const { data } = await makeRequest('get', `/funds/lps/${id}`);
      return data;
    } catch (error) {
      console.log(error, 'err');
      return rejectWithValue(error);
    }
  }
);
