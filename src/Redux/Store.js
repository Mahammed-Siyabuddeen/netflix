import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import Reducer from "./Root-reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store=createStore(Reducer,composeEnhancers(applyMiddleware(thunk)))

export default Store