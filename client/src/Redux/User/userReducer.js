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
        state: payload,
      };

    case USER_LOGOUT:
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
