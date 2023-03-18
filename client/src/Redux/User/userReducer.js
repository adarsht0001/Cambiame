import { USER_LOGIN, USER_LOGOUT } from './userTypes';

const initialState = {
  name: '',
  email: '',
  access_Token: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return {
        name: payload.username,
        email: payload.email,
        access_Token: payload.accesToken,
      };

    case USER_LOGOUT:
      return { initialState };

    default:
      return state;
  }
};

export default reducer;