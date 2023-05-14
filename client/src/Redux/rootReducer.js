import { combineReducers } from 'redux';
import userReducer from './User/userReducer';
import adminReducer from './admin/adminReducer';
import chatReducer from './chat/chatReducer';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  chat: chatReducer,
});

export default rootReducer;
