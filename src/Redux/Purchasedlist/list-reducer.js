import { PurchaseActions } from "./list-type"

const InitialState={

    list:[]
}

export const PurchasedReducer=(state=InitialState,action)=>{
    const {payload,type}=action
    switch(type){
        case  PurchaseActions.GET_PURCHASE_LIST:
            return{list:payload}
        default :return state   
        
    }

}