import { ADMIN_LOGIN, ADMIN_LOGOUT } from './adminTypes';

export const adminLogin = (admin) => ({
  type: ADMIN_LOGIN,
  payload: admin,
});

export const adminLogout = () => ({
  type: ADMIN_LOGOUT,
});
