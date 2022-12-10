import React from 'react'
import './Signout.css'
function Signout(props) {
    // console.log(props.trigger)
    return (props.trigger)? (
        <div>
             <div className="popup">
                 <div className="popup-inner">
                    <button onClick={()=>props.settrigger(false)} className="close-popup-btn">close</button>
                    {props.children}
                </div>
           </div>
        </div>
    ):''
}

export default Signout
