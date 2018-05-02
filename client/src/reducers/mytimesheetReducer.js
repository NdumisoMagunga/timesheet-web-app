import {MY_TIMESHEETS} from '../actions/types';

export default function(state = false, action){
    switch(action.type){
        case MY_TIMESHEETS:
        return action.payload || false;
         default:
        return state;
    }
}

