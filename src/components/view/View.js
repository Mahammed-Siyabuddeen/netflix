import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './view.css'
import { fetchPlaymovie, getmovieadditionaldata, GetPlayMovieList, removemovieadditionaldata } from '../../Redux/Movies/Movies-action'
import {   doc, serverTimestamp, } from 'firebase/firestore'
import { auth, db } from '../../Firebase/Config'
import { Addtolist } from '../../Redux/List/list-action'
import { setcurrentuser } from '../../Redux/User/User-action'
function View() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const found = useSelector((state) => state)
    const user = found.user.user

    console.log(user)
    const [processing, setprocessing] = useState(true)
    const { credits, poster_path, title, overview, vote_average, backdrop_path } = found.movie.additionaldata
    const movieid = found.movie.additionaldata.id
    const playList = found.movie.playList
    const paid = playList && playList.find((data) => data.movieid == id)
    console.log(playList)

    useEffect( () => {
        setprocessing(true)
        auth.onAuthStateChanged(user => {
            dispatch(setcurrentuser(user))
            if (user) {
                dispatch(GetPlayMovieList(user.uid))
            }
        })
        dispatch(getmovieadditionaldata(id))
        setprocessing(false)
        return ()=>{
            dispatch(removemovieadditionaldata())
        } 

    }, [dispatch,id])
    

    // movie price calcuating part //
    const rate = vote_average * 10 + 20;
    const gst = rate * (18 / 100);
    const price = rate + gst


    const Addmylist = async () => {
        if (user) {
            console.log('started')
            const docref = doc(db, 'users', `${user.uid}`, 'mylist', `${movieid}`)
            console.log('payloaded')
            const payload = { title, poster_path, movieid, createdAt: serverTimestamp() }
            await dispatch(Addtolist({ docref, payload }))

        }
        else {
            alert('please login')
        }
    }
    const payedsubmit = () => {
        if(user){
        if (paid) {
            dispatch(fetchPlaymovie(id))
            Navigate('/play')
        } else {
            Navigate('/payment', { state: { price, movieid, title } })
        }
    }
    else {
        alert('please login')
    }
}
    return (
        <div className='movie-item-page'>
            <div className="item-page-overview">
                <div className="item-page">
                    <img src={`http://image.tmdb.org/t/p/w1280/${backdrop_path}`} alt="" className="item-page__bg" />
                </div>
            </div>
            <div className="view-container">
                <div className="view">
                    <div className="row">
                        <div className="img-views">
                            <img className='view-img' src={`https://image.tmdb.org/t/p/${window.innerWidth>800?'w400':'w300'}/${poster_path}`} alt="" />
                        </div>
                        <div className="over-view">
                            <h1>{title}</h1>
                            <span className="view-decription">
                                {overview}
                            </span>
                            <br />
                            <div className="rating">
                                <div className="row">
                                    <img style={{ width: '50px' }} src="https://netflix-clone-by-shivam.netlify.app/static/media/imdb.f7f2904f.png" alt="" />
                                    <span style={{ marginLeft: '10px' }}>{vote_average}/10</span>
                                </div>

                            </div>
                            <br />
                            <h2>Cast</h2>
                            <div className="cast">
                                <div className="row">
                                    {credits && credits.cast.slice(0, 4).map((data) =>
                                        <div className="cast-img">
                                            <img width='100px' src={`https://image.tmdb.org/t/p/w200/${data.profile_path}`} alt="" />
                                            <p>{data.original_name}</p>
                                        </div>
                                    )
                                    }
                                </div>
                                <div className="view-buttons">
                                    <button
                                        onClick={Addmylist}
                                        className='view-button'>My-List</button>
                                    <button
                                        disabled={processing}
                                        onClick={payedsubmit}
                                        className='view-button'>
                                        {paid ? (<span className='price'>Play <i class="fas fa-check"></i></span>) :
                                            (<span className='price'>Play &#8377;{price}</span>)}
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>







                </div>
            </div>
            {/* </div> */}
        </div>
    )
}


export default View
