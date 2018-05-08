import {combineReducers} from 'redux';
import authReducer from './authReducer';
import mytimesheetReducer from './mytimesheetReducer';
import timesheetsReducer from './timesheetsReducer';

export default combineReducers({
    auth: authReducer,
    mysheets: mytimesheetReducer,
    timesheets: timesheetsReducer,

});