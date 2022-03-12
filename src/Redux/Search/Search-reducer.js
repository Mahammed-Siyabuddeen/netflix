import { SearchActions } from "./Search-type"

const InitialState={
    list:[]
}

export const SearchReducer=(state=InitialState,action)=>{
    const {type,payload}=action
    switch(type)
    {
        case SearchActions.SET_SEARCH_DATA:
            return {list:payload}

        default :return state    
    }
}