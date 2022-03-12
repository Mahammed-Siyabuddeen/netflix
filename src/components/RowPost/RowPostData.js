// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { imageUrl } from '../../constant/constants'
// function RowPostData({ obj }) {
//     const [display, setdisplay] = useState(false)
//     const Navigate=useNavigate()
//     return (
//         <div onClick={()=>Navigate(`/mmk`)}
//             onMouseOver={() => setdisplay(true)}
//             onMouseLeave={() => setdisplay(false)}
//             className='row-post-img-container'>
//             {display && <div className="row-post-img-contents">
//                 <h3 className='row-post-contents'>{obj.title}</h3>
//                 <p className='row-post-overview'>{obj.overview}</p>
//             </div>}
//             <img
//                 className='poster' src={`${imageUrl + obj.backdrop_path}`}
//                 alt='poster' />

//         </div>
//     )
// }

// export default RowPostData
