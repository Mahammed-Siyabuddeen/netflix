import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { imageUrl } from '../../constant/constants'
import { auth } from '../../Firebase/Config'
import { getpurchaseList } from '../../Redux/Purchasedlist/list-actions'

function PurchasedList() {

    const state = useSelector((state) => state)
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const [show, setshow] = useState(-1)
    const purchaseList = state.purchaselist.list

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
                if(user){
                        console.log('stst')
                        dispatch(getpurchaseList(user.uid))
                    }
                
                })
            // purchaseList&&    dispatch(getpurchaseList(movie.playList))
    }, [dispatch])

    return (
        <div className='list-overview'>
            <h2 className="list-overview-title">PurchasedList List</h2>
            <div className="list-overview-inner">

                {
                    purchaseList.map((item,i) =>


                        <div onMouseOver={() => setshow(i)} onMouseLeave={() => setshow(-1)}
                        className="list-item">
                                <div className="item-image-remove" style={{display:show===i?'block':'none'}}
                                    onClick={() => Navigate(`/play`, { state: item.videos.results[0].key })}>
                                    <span><i class="fas fa-play fa-2x"></i></span>
                                </div>
                            <div className="item-image">
                                <img className='item-image-img' src={`${imageUrl + item.poster_path}`} alt="" />

                            </div>
                            <div className="item-image-title">
                                <h2>{item.title}</h2>
                            </div>
                        </div>
                    )
                }


            </div>
        </div>
    )
}

export default PurchasedList
