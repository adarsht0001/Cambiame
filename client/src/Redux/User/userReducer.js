import { USER_EDIT, USER_LOGIN, USER_LOGOUT } from './userTypes';

const initialState = {
  loggedIn: false,
  name: '',
  email: '',
  access_Token: '',
  id: '',
  profile: '',
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
        profile: payload.profile || null,
      };

    case USER_LOGOUT:
      return { initialState };

    case USER_EDIT:
      return {
        ...state,
        name: payload.username,
        email: payload.email,
        profile: payload.profile,
      };

    default:
      return state;
  }
};

export default reducer;
