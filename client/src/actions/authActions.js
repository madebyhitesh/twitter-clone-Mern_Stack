import axios from 'axios'
import {returnErrors} from './errorAction'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
  } from './types'

//Check token & load user 

export const loadUser = () => (dispatch,getState) =>{
    //user loading
    dispatch({type : USER_LOADING})

   

    axios.get('/users/user',tokenConfig(getState))
            .then(res => dispatch({
                type: USER_LOADED,
                payload : res.data
            }))
            .catch(err =>{
                dispatch(returnErrors(err.response.data,err.response.status));
                dispatch({
                    type: AUTH_ERROR
                });
            });

} 

//Register user

export const register = ({name,email,password}) => dispatch =>{
    //Headers
    const config = {
        headers : {
            'Content-Type' : "application/json"
        }
    }

    //request body
    const body = JSON.stringify({name,email,password});

    axios.post('/users/register',body,config)
        .then(res =>dispatch({
            type: REGISTER_SUCCESS,
            payload : res.data
        }))
        .catch(err =>{
            dispatch(returnErrors(err.response.data,err.response.status,'Register_Fail'));
            dispatch({
                type: REGISTER_FAIL
            })
        })


}
export const login = ({name,password}) => dispatch =>{
    //Headers
    const config = {
        headers : {
            'Content-Type' : "application/json"
        }
    }

    //request body
    const body = JSON.stringify({name,password});

    axios.post('/users/login',body,config)
        .then(res =>dispatch({
            type: LOGIN_SUCCESS,
            payload : res.data
        }))
        .catch(err =>{
            dispatch(returnErrors(err.response.data,err.response.status,'Login_Fail'));
            dispatch({
                type: LOGIN_FAIL
            })
        })


}

// Logging out the current user

export const logout = () =>dispatch =>{
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

// Setup config/headers and token

export const tokenConfig = getState =>{

     //Get token from local storage
     const token = getState().auth.token;

     //Headers
     const config = {
         headers: {
             "Content-Type" : "application/json"
         }
     }
 
     //If token, add to headers
     if(token){
         config.headers['x-auth-token'] = token;
     }

     return config
}