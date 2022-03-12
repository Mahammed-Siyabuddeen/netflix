import MoviesActionType from "./Movies-type"

const initialstate={
        Popular:[],
        Originals:[],
        Action:[],
    moviecast:[],
    movievideos:'',
    poster_path:'',
    additionaldata:[],

}


const MovieReducer=(state=initialstate,action)=>{
  const  {type,payload}=action
    switch(type){
    case MoviesActionType.SET_MOVIE_DATA:{
        return {...state,Action:payload}
    }
    case MoviesActionType.SET_MOVIE_DATA_ORIGIN:{
        return {...state,Originals:payload}
    }
    case MoviesActionType.SET_MOVIE_DATA_POPULAR:{
        return {...state,Popular:payload}
    }
    case MoviesActionType.SET_MOVIE_DATA_SUCCESS:{
        return{...state}
    }
    case MoviesActionType.SET_MOVIE_ADDITIONAL_DATA:{
        return{...state,
           additionaldata:payload
        }
    }
    case MoviesActionType.REMOVE_MOVIE_ADDITIONAL_DATA:{
        return{...state,
        additionaldata:[]}
    }
    
    case MoviesActionType.ADD_PLAY_MOVIE:{
        return {...state,play:payload}
    }
    case MoviesActionType.PLAY_MOVIE_LIST:{
        return{...state,playList:payload}
    }
    case MoviesActionType.FETCH_PURCHASE_MOVIE:{
        return{...state,play:payload}
    }
    case MoviesActionType.GET_BANNER_LIST:
        return{...state,bannerlist:payload}
    default: return state
    }
}
export default MovieReducer