import { API_KEY, baseUrl } from "../constant/constants"
export const originals=`${baseUrl}/discover/tv?api_key=${API_KEY}&with_networks=213`
export const action=`${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=28`
export const popular=`${baseUrl}/movie/popular?api_key=${API_KEY}&language=en-US&page=3`