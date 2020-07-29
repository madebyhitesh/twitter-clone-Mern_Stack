import {GET_ITEMS,ADD_ITEM,ITEMS_LOADING} from './types'
import axios from 'axios'
import {tokenConfig } from './authActions'
import {returnErrors} from './errorAction'

export const setItemsLoading = () => {
    return {
      type: ITEMS_LOADING
    };
  };

export const getItems = ()=>(dispatch) =>{
    dispatch(setItemsLoading())
    axios.get('/posts')
    .then(res => dispatch({
        type: GET_ITEMS,
        payload : res.data
    }))
    .catch(err =>{
        dispatch(returnErrors(err.response.data,err.response.status));
    });
}


export const addItem = (item)=>(dispatch,getState)=>{
    
    axios.post('/posts',item,tokenConfig(getState))
    .then(res =>dispatch({
        type: ADD_ITEM,
        payload : res.data
    }))
    .catch(err =>{
        dispatch(returnErrors(err.response.data,err.response.status));
    })
}