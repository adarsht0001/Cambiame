import { USER_EDIT, USER_LOGIN, USER_LOGOUT } from './userTypes';

export const Login = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const Logout = () => ({
  type: USER_LOGOUT,
});

export const EditProfile = (data) => ({
  type: USER_EDIT,
  payload: data,
});
