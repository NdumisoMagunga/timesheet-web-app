import { FETCH_USER,MY_TIMESHEETS, FETCH_TIMESHEETS, FETCH_USERS, FETCH_VENUES} from './types';

export const  fetchUser =  () => async dispatch => {
    const res = await fetch('/api/get-current-user', {credentials: 'include'});
    const data = await res.json();
    dispatch({type: FETCH_USER, payload: data.user});

};

export const CheckIn =(obj) => async dispatch =>{
    const res = await fetch('/api/time-in', {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
    const data = await res.json();

    myTimesheets(obj.user);

};

export const CheckOut =(obj) => async disptach =>{
    const res = await fetch('/api/time-out', {
        method:'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
    const data = await res.json();

    myTimesheets(obj.user);
};

export const myTimesheets = (id) => async dispatch =>{
    const res = await fetch('/api/my-timesheet/'+ id, {credentials: 'include'});
    const data = await res.json();
    dispatch({type: MY_TIMESHEETS, payload: data});


};

export const fetchTimesheets = () => async dispatch => {
    const res = await fetch('/api/timesheets');
    const data = await res.json();
    dispatch({type: FETCH_TIMESHEETS, payload: data});
};


export const  fetchUsers =  () => async dispatch => {
    const res = await fetch('/api/users');
    const data = await res.json();
    dispatch({type: FETCH_USERS, payload: data});

};

export const  fetchVenues =  () => async dispatch => {
    const res = await fetch('/api/venue');
    const data = await res.json();
    dispatch({type: FETCH_VENUES, payload: data});

};