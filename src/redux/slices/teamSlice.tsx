import { createSlice } from '@reduxjs/toolkit';
import { IAdminUserQueryParam, ITeamInitialState } from 'types';
import { CreateAdminUser, GetAdminUsers } from '../actions/teamActions';

const initialState: ITeamInitialState = {
  users: null,
  loading: false,
  currentUser: null,
  count: 0,
  queryParams: { searchFilter: '', cursor: '' },
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setLoadingTrue(state) {
      state.loading = true;
    },
    setQueryParam(state, { payload }) {
      state.queryParams.cursor = '';
      state.queryParams[payload.param as keyof IAdminUserQueryParam] = payload.value;
    },
    setCurrentAdminUser(state, { payload }) {
      state.currentUser = payload;
    },
    clearCurrentAdminUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAdminUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetAdminUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (state.queryParams.cursor && Array.isArray(state.users)) {
        state.users = [...state.users, ...payload.adminUsers];
      } else {
        state.users = payload.adminUsers;
      }
      (state.count = payload.count),
        (state.queryParams.cursor = payload.adminUsers[payload.adminUsers.length - 1]?.id);
    });
    builder.addCase(CreateAdminUser.fulfilled, (state, { payload }) => {
      if (state.users?.length) {
        let newUsers = [...state.users];
        const index = newUsers.findIndex((o) => o.id === payload.id);
        if (index === -1) {
          newUsers = [payload, ...newUsers];
          state.queryParams.cursor = payload.id;
        } else {
          newUsers[index] = payload;
        }
        state.users = newUsers;
      }
    });
  },
});

export const { setLoadingTrue, clearCurrentAdminUser, setCurrentAdminUser, setQueryParam } =
  teamSlice.actions;

export default teamSlice.reducer;
