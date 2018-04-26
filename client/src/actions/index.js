import { FETCH_USER} from './types';



export const  fetchUser =  () => async dispatch => {
    const res = await fetch('/api/get-current-user', {credentials: 'include'});
    const data = await res.json();
    dispatch({type: FETCH_USER, payload: data.user});

};