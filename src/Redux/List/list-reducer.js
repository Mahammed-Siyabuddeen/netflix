import ListActionTypes from "./list-type"

const Initialstate={
mylist:[]
}
export const listreducer=(state=Initialstate,action)=>{
    const {type,payload}=action
    switch(type){
        // case ListActionTypes.ADD_TO_LIST:
        //    const ya= state.mylist.find(ob=>ob.id==payload.id)
        //    console.log(ya)
            // return{...state,mylist:[payload,...state.mylist]}
        case ListActionTypes.FECTH_LIST:
            return{...state, mylist:payload}
        default :return state    
    }
}