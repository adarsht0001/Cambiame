import { ADMIN_LOGIN, ADMIN_LOGOUT } from './adminTypes';

const initialState = {
  adminLogged: false,
  email: '',
  access_Token: '',

};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADMIN_LOGIN:
      return {
        adminLogged: true,
        email: payload.email,
        access_Token: payload.token,
      };
    case ADMIN_LOGOUT:
      return { initialState };
    default:
      return state;
  }
};

export default adminReducer;
