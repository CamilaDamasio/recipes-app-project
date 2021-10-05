import { combineReducers } from 'redux';
import reducerAPI from './reducerAPI';
import login from './loginReducer';

const rootReducer = combineReducers({
  reducerAPI, login,
});

export default rootReducer;
