import { auth } from "../../Firebase/Config"
import UserActionTypes from "./User-type"

export const setcurrentuser=(user)=>{
return({
    type:UserActionTypes.SET_CURRENT_USER,
    payload:user
})
}

export const logoutcurrentuser=()=>{
    return({
        type:UserActionTypes.SET_CURRENT_USER,
    })
    }
export const getuser=()=>{
    return dispatch=>{
       auth.onAuthStateChanged((user)=>{
        
        dispatch({
            type:UserActionTypes.USER_SET,
            payload:user
        })
        })
    }
}