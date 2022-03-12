import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { imageUrl } from '../../constant/constants'
import { getmoviedata } from '../../Redux/Movies/Movies-action'

function RowPost1(props) {
    const { title } = props
    if (title === 'Action') {
        console.log('twaibba');
    }
    console.log(title);
    const [show, setshow] = useState(-1)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const movie = useSelector((state) => state.movie)
    useEffect(() => {
        dispatch(getmoviedata(props.url))

    }, [dispatch,props.url])
    console.log(movie.movieItems)
    return (
        <div className='row-poster-main'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {
                    title === "Action" && movie.Action.map((obj, i) => {
                        return (
                            <div
                                onClick={() => Navigate(`/${obj.id}`)}
                                onMouseOver={() => setshow(i)}
                                onMouseLeave={() => setshow(-1)}
                                className='row-post-img-container'>

                                <div className="row-post-img-contents"
                                    style={{ display: show === i ? 'block' : 'none' }}
                                >
                                    <h3 className='row-post-contents'>{obj.title}</h3>
                                    <p className='row-post-overview'>{obj.overview}</p>
                                </div>

                                <img
                                    className='poster' src={`${imageUrl + obj.backdrop_path}`}
                                    alt='poster' />
                            </div>
                        )
                    })
                }

                {
                    title === "Originals" && movie.Originals.map((obj, i) => {
                        return (
                            <div
                                onClick={() => Navigate(`/${obj.id}`)}
                                onMouseOver={() => setshow(i)}
                                onMouseLeave={() => setshow(-1)}
                                className='row-post-img-container'>

                                <div className="row-post-img-contents"
                                    style={{ display: show === i ? 'block' : 'none' }}
                                >
                                    <h3 className='row-post-contents'>{obj.title}</h3>
                                    <p className='row-post-overview'>{obj.overview}</p>
                                </div>

                                <img
                                    className='poster' src={`${imageUrl + obj.backdrop_path}`}
                                    alt='poster' />
                            </div>
                        )
                    })
                }
                {
                    title === "Popular" && movie.Popular.map((obj, i) => {
                        return (
                            <div
                                onClick={() => Navigate(`/${obj.id}`)}
                                onMouseOver={() => setshow(i)}
                                onMouseLeave={() => setshow(-1)}
                                className='row-post-img-container'>

                                <div className="row-post-img-contents"
                                    style={{ display: show === i ? 'block' : 'none' }}
                                >
                                    <h3 className='row-post-contents'>{obj.title}</h3>
                                    <p className='row-post-overview'>{obj.overview}</p>
                                </div>

                                <img
                                    className='poster' src={`${imageUrl + obj.backdrop_path}`}
                                    alt='poster' />
                            </div>
                        )
                    })
                }

            </div>
            {/* { urlId &&   <YouTube opts={opts}  videoId={urlId.key} />} */}
        </div>
    )
}

export default RowPost1
