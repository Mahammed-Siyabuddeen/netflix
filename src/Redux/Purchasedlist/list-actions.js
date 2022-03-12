import axios from "axios"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { API_KEY, baseUrl } from "../../constant/constants"
import { db } from "../../Firebase/Config"
import { PurchaseActions } from "./list-type"

const fetch = (res) => {
    return Promise.all(
        res.map((res) => {
            return axios.get(`${baseUrl}/movie/${res.movieid}?api_key=${API_KEY}&append_to_response=videos,credits&language=en-US`)
        })
    )
}
export const getpurchaseList = (res) => {
    console.log(res)
    return dispatch => {
        const queryref = collection(db, 'users', `${res}`, 'purchasedList')
    const q = query(queryref, orderBy('purchasedAt', 'desc'))
    onSnapshot(q, snapshot => {
        const data = snapshot.docs.map((res) => res.data());
        console.log(data)
        fetch(data).then((data) => {
            const lsitdata=data.map((res)=>res.data)
            console.log(data);
            dispatch({
                
                type: PurchaseActions.GET_PURCHASE_LIST,
                payload: lsitdata
            })
        })
    })
    }
}
// Promise.all(
//     res.map((res)=>{
//         return axios.get(`${baseUrl}/movie/${res.movieid}?api_key=${API_KEY}&append_to_response=videos,credits&language=en-US`)
//     })
// )
// console.log(Promise);
// const l=[]
//  const data=await res.map(async(res)=>{
//                const d=await axios.get()
//               console.log(d);
//               l.concat.apply(...l,d)
//             })
//     console.log(data)