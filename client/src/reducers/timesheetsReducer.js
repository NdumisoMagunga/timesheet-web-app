import {FETCH_TIMESHEETS} from '../actions/types';

export default function(state = false, action){
    switch(action.type){
        case FETCH_TIMESHEETS:
        return action.payload || false;
         default:
        return state;
    }
}
