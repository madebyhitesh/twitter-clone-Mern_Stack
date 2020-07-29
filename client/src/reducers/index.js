import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import darkReducer from './darkReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
export default combineReducers({
    item: itemReducer,
    dark: darkReducer,
    error: errorReducer,
    auth : authReducer
});