import { combineReducers } from 'redux';
import userReducer from './User/userReducer';
import adminReducer from './admin/adminReducer';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

export default rootReducer;
