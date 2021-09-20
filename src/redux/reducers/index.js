import {combineReducers} from 'redux'
import authReducer from './authReducer'
import reqReducer from './reqReducer'
export default combineReducers ({
    auth: authReducer,
    request: reqReducer
})