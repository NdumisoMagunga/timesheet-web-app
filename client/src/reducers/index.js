import {combineReducers} from 'redux';
import authReducer from './authReducer';
import mytimesheetReducer from './mytimesheetReducer';

export default combineReducers({
    auth: authReducer,
    mysheets:mytimesheetReducer
});