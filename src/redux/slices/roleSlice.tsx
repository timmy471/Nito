import { IRoleInitialState } from 'types';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { GetRoles, GetPermissions, CreateRole, GetRole } from '../actions/roleActions';

const initialState: IRoleInitialState = {
  roles: [],
  loading: false,
  isSubmitting: false,
  permissions: null,
  currentRole: null,
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setLoadingTrue(state) {
      state.loading = true;
    },
    ClearCurrentRole(state) {
      state.currentRole = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetRoles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.roles = payload;
    });
    builder.addCase(GetPermissions.fulfilled, (state, { payload }) => {
      state.permissions = payload;
    });
    builder.addCase(CreateRole.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(GetRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetRole.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.currentRole = payload;
    });
    builder.addMatcher(isAnyOf(CreateRole.fulfilled, CreateRole.rejected), (state) => {
      state.isSubmitting = false;
    });
  },
});

export const { setLoadingTrue, ClearCurrentRole } = roleSlice.actions;

export default roleSlice.reducer;
