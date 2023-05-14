import { START_CHAT, END_CHAT } from './chatTypes';

export const CHAT = (user) => ({
  type: START_CHAT,
  payload: user,
});

export const ENDCHAT = () => ({
  type: END_CHAT,
});
