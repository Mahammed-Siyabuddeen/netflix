import axios from "axios"
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore"
import { API_KEY, baseUrl } from "../../constant/constants"
import { db } from "../../Firebase/Config"
import { action, originals, popular } from "../../Services/urls"
import MoviesActionType from "./Movies-type"

export const getmoviedatasuccess = () => ({
  type: MoviesActionType.SET_MOVIE_DATA_SUCCESS
})

export const getbannerList = () => {
  return dispatch => {
    axios.get(`${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`).then(({ data }) => {
      console.log(data);
      dispatch({
        type: MoviesActionType.GET_BANNER_LIST,
        payload: data.results
      })
    })

  }
}
// axios.get(`${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`).then(({data})=>{
//   const banner=data.results
//   console.log(data)







export const getmoviedata = (name) => {
  console.log(name);
  return dispatch => {
    axios.get(name).then(({ data }) => {
      const moviedata = data.results
      // const newarray=Array.prototype.concat.apply([],moviedata)
      console.log(moviedata)
      dispatch({
        
        type:name===action? MoviesActionType.SET_MOVIE_DATA:
        name===popular? MoviesActionType.SET_MOVIE_DATA_POPULAR:
        name===originals? MoviesActionType.SET_MOVIE_DATA_ORIGIN:
        MoviesActionType.SET_MOVIE_DATA,
        payload: moviedata
      })
      dispatch(getmoviedatasuccess())
    }).catch((err)=>{
      console.log(err);
    })

  }
}

export const getmovieadditionaldata = (id) => {
  return dispatch => {
    axios.get(`${baseUrl}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits&language=en-US`)
      .then((data) => {
        dispatch({
          type: MoviesActionType.SET_MOVIE_ADDITIONAL_DATA,
          payload: data.data
        })
      })
  }
}
export const removemovieadditionaldata = () => {
  console.log('unmount entered man');
  return {
    type: MoviesActionType.REMOVE_MOVIE_ADDITIONAL_DATA,
  }
}

//***************PURCHASED MOVIE ACTIOS *************************/

export const addtoPlaymovie = (response) => {
  const { movieid, id, uid } = response
  return dispatch => {
    axios.get(`${baseUrl}/movie/${movieid}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
      const key = res.data.results[0].key
      console.log(res.data.results[0].key)
      const docref = doc(db, 'users', `${uid}`, 'purchasedList', `${id}`)
      setDoc(docref, { movieid, purchasedAt: serverTimestamp() }).then(() => {
        dispatch({
          type: MoviesActionType.ADD_PLAY_MOVIE,
          payload: key
        })
      })
    })
  }
}




export const GetPlayMovieList = (response) => {
  return dispatch => {
    const queryref = collection(db, 'users', `${response}`, 'purchasedList')
    const q = query(queryref, orderBy('purchasedAt', 'desc'))
    console.log(q);
    onSnapshot(q, snapshot => {
      const data = snapshot.docs.map((res) => res.data());
      console.log(data)
      dispatch({
        type: MoviesActionType.PLAY_MOVIE_LIST,
        payload: data
      })
    })
  }
}

export const fetchPlaymovie = (response) => {
  return dispatch => {
    axios.get(`${baseUrl}/movie/${response}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
      const key = res.data.results[0].key
      dispatch({
        type: MoviesActionType.FETCH_PURCHASE_MOVIE,
        payload: key
      })
    })
  }

}
