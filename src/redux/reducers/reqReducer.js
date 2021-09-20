import {OREQ,IREQ} from '../types'
const INITIAL_STATE={
    inrequests:[]
}

const reqReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case OREQ:{
            return {...state}
        }
        case IREQ:{
            return {...state, inrequests:action.payload}
        }
        default:
            return {...state}
    }
}

export default reqReducer
