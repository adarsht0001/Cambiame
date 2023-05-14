/* eslint-disable no-underscore-dangle */
import { START_CHAT, END_CHAT } from './chatTypes';

const initialState = {
  name: '',
  lastLogged: '',
  lastMessage: '',
  id: '',
};

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_CHAT:
      return {
        name: payload.username,
        id: payload._id,
        lastMessage: payload.lastMessage,
        lastLogged: payload.lastLogged,
      };
    case END_CHAT:
      return { initialState };
    default:
      return state;
  }
};

export default chatReducer;
