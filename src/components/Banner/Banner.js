import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {  imageUrl } from '../../constant/constants'
import { getbannerList } from '../../Redux/Movies/Movies-action'

function Banner() {
    const [number, setnumber] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const movie = useSelector(state => state.movie)
    useEffect(() => {
        console.log('ulllek poi');
        dispatch(getbannerList())
    }, [dispatch])
    const { bannerlist } = movie
    console.log(bannerlist && bannerlist.length);
    return (


        <div>
            {
                movie.bannerlist &&
                <div style={{
                    backgroundImage: `url(${imageUrl + bannerlist[number].backdrop_path
                        })`
                }}
                    className='banner'>
                    <i class="fas fa-chevron-left fa-3x chervon-left" onClick={() => setnumber(number === 0 ? bannerlist.length - 1 : number - 1)}></i>
                    <i class="fas fa-chevron-right fa-3x chervon-right" onClick={() => setnumber(number === bannerlist.length - 1 ? 0 : number + 1)}></i>
                    <div className='content' onClick={()=>navigate(`/${bannerlist[number].id}`)}>
                        <h1 className='title'>{bannerlist[number].title}</h1>

                        <div className='banner_buttons'>
                        </div>
                        <h1 className='description'>{bannerlist[number].overview}</h1>
                    </div>
                    <div className='fade_bottom'></div>

                </div>

            }
        </div>
    )

}

export default Banner
