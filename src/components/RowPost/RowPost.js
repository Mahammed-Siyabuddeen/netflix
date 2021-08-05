import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import { imageUrl } from '../../constant/constants'
import YouTube from 'react-youtube'
import { API_KEY } from '../../constant/constants'


function RowPost(props,index) {
    const [movie, setMovie] = useState([])
     const [urlId,seturlId] =useState('')
    
    useEffect(() => {
       axios.get(props.url).then(response=>{
           console.log(response.data)
           setMovie(response.data.results)
       })
    }, [])
    
     const opts = {
         height: '390',
        width: '100%',
        playerVars: {
          autoplay: 0,
       },};

    const handlemovie=(obj)=>{
        console.log(obj)
         axios.get(`/movie/${obj}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if(response.data.results.length !==0){

             seturlId(response.data.results[0])
            }else{
                console.log('array empty')
            }
         }
         )
    }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {
                    movie.map((obj)=>
                    <img onClick={()=>handlemovie(obj.id)} className={props.isSmall? 'smallPoster' :'poster'} src={`${imageUrl+obj.backdrop_path}`} alt='poster'/>
                    )
                }
                
            </div>
      { urlId &&   <YouTube opts={opts}  videoId={urlId.key} />}
        </div>
    )
}

export default RowPost
