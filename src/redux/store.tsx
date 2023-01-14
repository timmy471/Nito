import auth from './slices/authSlice';
import asset from './slices/assetSlice';
import lp from '@src/redux/slices/lpSlice';
import spvs from '@src/redux/slices/spvSlice';
import team from '@src/redux/slices/teamSlice';
import dashboard from './slices/dashboardSlice';
import roles from '@src/redux/slices/roleSlice';
import { createWrapper } from 'next-redux-wrapper';
import fundmanager from '@src/redux/slices/fundManagerSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducers = combineReducers({
  auth,
  fundmanager,
  lp,
  dashboard,
  asset,
  spvs,
  roles,
  team,
});

export const makeStore = () =>
  configureStore({
    reducer: reducers,
  });

export const store = createWrapper(makeStore);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
