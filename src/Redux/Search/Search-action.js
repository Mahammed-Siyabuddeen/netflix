import axios from "axios"
import { API_KEY, baseUrl } from "../../constant/constants"
import { SearchActions } from "./Search-type"

const fecthdata=(value)=>{
    //  value=value.split("").join("%20")
  const url = `${baseUrl}/search/multi?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`;
  return  axios.get(url)

}
export const getsearchData=(value)=>{
  return dispatch=>{
    fecthdata(value).then((data)=>{
        console.log(data.data.results);
        dispatch({
            type:SearchActions.SET_SEARCH_DATA,
            payload:data.data.results
        })
    })
  }
}