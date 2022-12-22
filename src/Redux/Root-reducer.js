import { combineReducers } from "redux";
import { listreducer } from "./List/list-reducer";
import MovieReducer from "./Movies/Movies-Reducer";
import { PurchasedReducer } from "./Purchasedlist/list-reducer";
import { SearchReducer } from "./Search/Search-reducer";
import { Userreducer } from "./User/User-reducer";
const Reducer=combineReducers({
    movie:MovieReducer,
    user:Userreducer,
    list:listreducer,
    purchaselist:PurchasedReducer,
    searchlist:SearchReducer
    
})

export default Reducer