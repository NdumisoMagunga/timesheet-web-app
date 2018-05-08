import {combineReducers} from 'redux';
import authReducer from './authReducer';
import mytimesheetReducer from './mytimesheetReducer';
import timesheetsReducer from './timesheetsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    mysheets: mytimesheetReducer,
    timesheets: timesheetsReducer,
    users:usersReducer

});