import {FETCH_VENUES} from '../actions/types';

export default function(state = [], action){
    switch(action.type){
        case FETCH_VENUES:
        return action.payload;
         default:
        return state;

    }
}