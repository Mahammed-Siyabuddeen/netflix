import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/Config";
import ListActionTypes from "./list-type";

export const Fecthlist=(uid)=>{
    return(dispatch)=>{
        const queryref=collection(db,'users',`${uid}`,'mylist')
    const q= query(queryref,orderBy('createdAt',"desc"))
        onSnapshot(q,snapshot=>{
           const data=snapshot.docs.map((res)=>{return{data:res.data(),id:res.id}})
            dispatch({
                type:ListActionTypes.FECTH_LIST,
                payload:data
            })
        })
    }
}
export const Addtolist=(obj)=>{
    const {docref,payload}=obj
    return(dispatch)=>{
        setDoc(docref,payload).then((call)=>{
         console.log(call);
         dispatch({
             type:ListActionTypes.ADD_TO_LIST,
             payload:obj.payload
         })
        })
        // addDoc(docref,payload).then((callback)=>{
        //     console.log(callback);
        // })

    }
}
export const removefromList=(res)=>{
    console.log(res);
     deleteDoc(doc(db,'users',`${res.uid}`,'mylist',`${res.id}`)).then(()=>{
         console.log('deletd');
     })
     return({
         type:ListActionTypes.REMOVE_FROM_LIST
     })
  
}