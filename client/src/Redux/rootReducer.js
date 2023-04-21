import { combineReducers } from 'redux';
import userReducer from './User/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
