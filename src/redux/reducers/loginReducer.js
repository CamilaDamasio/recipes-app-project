import { createReducer } from '@reduxjs/toolkit';
import { LOGIN, LOGOUT } from '../actions/loginAction';

const INITIAL = {
  user: '',
};

const login = createReducer(INITIAL, (builder) => {
  builder.addCase(LOGIN, (state, action) => ({
    ...state,
    user: action.payload,
  }));
  builder.addCase(LOGOUT, () => ({
    INITIAL,
  }));
  builder.addDefaultCase((state) => state);
});

export default login;
