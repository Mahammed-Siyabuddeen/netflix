import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';
import './Play.css'
function Play(props) {
    const [err, seterr] = useState(false)
 const  movie=useSelector(state=>state.movie)
 console.log(movie.play);
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    }
    const error=()=>{
        
        seterr(true)
        console.log('error bannh');
    }
    const location = useLocation()
    console.log(location.state);
    return (
        <div >
            <div className="youtube-container">
              {!err ?  <YouTube className='youtube-video' onError={error} opts={opts}  videoId={movie.play?movie.play:location.state}/>:
                 <h3>the movie release Soon.. on Netflix</h3> }
            </div>
        </div>
    )
}

export default Play
