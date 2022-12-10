import UserActionTypes from "./User-type"
const Initialstate={
    user:[]
}
export const Userreducer=(state=Initialstate,action)=>{
    const {type,payload}=action
    switch(type)
    {
        case UserActionTypes.SET_CURRENT_USER:
            return{user:payload}
        case UserActionTypes.LOGOUT_CURRENT_USER:
            return{   }
            
        default :return{state}    
    }
}