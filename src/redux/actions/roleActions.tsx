// import { displayAlert } from '@src/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import makeRequest from '@src/services/makeRequest';
import { IRoleInitialState, IRole } from 'types';

export const GetPermissions = createAsyncThunk(
  'roles/get-permissions',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await makeRequest('get', '/roles/permissions');
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const GetRoles = createAsyncThunk('roles/get-roles', async (_, { rejectWithValue }) => {
  try {
    const { data } = await makeRequest('get', '/roles');
    return data.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const CreateRole = createAsyncThunk(
  'roles/create-role',
  async (
    { name, permissionIds, cb }: { name: string; permissionIds: string[]; cb: () => void },
    { getState, rejectWithValue }
  ) => {
    try {
      const {
        roles: { currentRole },
      } = getState() as { roles: { currentRole: IRole } };
      const method = !!currentRole ? 'put' : 'post';
      const url = !!currentRole ? `/roles/${currentRole.id}` : '/roles';

      await makeRequest(method, url, { name, permissionIds });
      cb();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const GetRole = createAsyncThunk(
  'roles/get-role',
  async ({ roleId }: { roleId?: string | string[] }, { rejectWithValue }) => {
    try {
      const { data } = await makeRequest('get', `/roles/${roleId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
