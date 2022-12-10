import React from 'react'
import {  useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { imageUrl } from '../../constant/constants'

function SearchPage() {
    const Navigate=useNavigate()
    const list=useSelector((state)=>state.searchlist.list)
    // useEffect(()=>{
    //     dispatch(getsearchData(d))
    // })
    return (
        <div className='list-overview'>
        <h2 className="list-overview-title">Search List</h2>
        <div className="list-overview-inner">

            {
                list.map((item) =>
                //   {if(item.title && item.poster_path){
            //    return     (
                        
                    <div
                    className="list-item">
                        {/* {show &&
                            <div className="item-image-remove"
                                onClick={() => Navigate(`/play`, { state: item.videos.results[0].key })}>
                                <span><i class="fas fa-play fa-2x"></i></span>
                            </div>} */}
                        <div className="item-image"  onClick={()=>Navigate(`/${item.id}`)}>
                            <img className='item-image-img' src={`${imageUrl + item.poster_path}`} alt="" />

                        </div>
                        <div className="item-image-title">
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                    // )}}

                )
            }


        </div>
    </div>
    )
}

export default SearchPage
