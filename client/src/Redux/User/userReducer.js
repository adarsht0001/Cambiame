import { USER_EDIT, USER_LOGIN, USER_LOGOUT } from './userTypes';

const initialState = {
  loggedIn: false,
  name: '',
  email: '',
  access_Token: '',
  id: '',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return {
        loggedIn: true,
        name: payload.username,
        email: payload.email,
        access_Token: payload.token,
        id: payload.id,
      };

    case USER_LOGOUT:
      return { initialState };

    case USER_EDIT:
      return {
        ...state,
        name: payload.username,
        email: payload.email,
      };
      // return {
      //   name:pay
      // }
    default:
      return state;
  }
};

export default reducer;
