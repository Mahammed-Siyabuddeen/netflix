import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { imageUrl } from '../../constant/constants'
import { auth } from '../../Firebase/Config'
import { Fecthlist, removefromList } from '../../Redux/List/list-action'
import './Mylist.css'
function Mylist() {
    const user = useSelector((state) => state.user.user)
    const Dispatch = useDispatch()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user)
                Dispatch(Fecthlist(user.uid))
        })

    }, [Dispatch])
    const mylist = useSelector((state) => state.list.mylist)
    const Navigate = useNavigate()

    return (
        <div className='list-overview'>
            <h2 className="list-overview-title">My List</h2>
            <div className="list-overview-inner">

                {
                    mylist.map((item, i) =>

                        <div>
                            <div className="item-image-remove" style={{backgroundColor:'#A9776C'}}
                                onClick={()=>removefromList({id:item.id,uid:user.uid})}
                             >
                                <span><i style={{width:'100%',marginLeft:'40%'}} class="fas fa-times fa-2x"></i></span>
                            </div>
                            <div 
                                onClick={() => Navigate(`/${item.data.movieid}`)}
                                className="list-item">

                                <div className="item-image">
                                    <img className='item-image-img' src={`${imageUrl + item.data.poster_path}`} alt="" />

                                </div>
                                <div className="item-image-title">
                                    <h2>{item.title}</h2>
                                </div>
                            </div>
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default Mylist
