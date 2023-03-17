import { USER_LOGIN, USER_LOGOUT } from './userTypes';

export const Login = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const Logout = () => ({
  type: USER_LOGOUT,
});
