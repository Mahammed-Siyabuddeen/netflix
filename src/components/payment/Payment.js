import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addtoPlaymovie } from '../../Redux/Movies/Movies-action'
import './payment.css'
function Payment() {
  const [disabled, setdisabled] = useState(true)
  const [processing, setprocessing] = useState('')
  const [succeeded, setsucceeded] = useState(false)
  const [clientSecret, setclientSecret] = useState(true)
  const [error, seterror] = useState(null)


  const Navigate = useNavigate()
  const location = useLocation()
  const stripe=useStripe()
  const elements=useElements()
  const dispatch=useDispatch()
 const user=useSelector((state)=>state.user)

  console.log("component mount ")
  console.log(" location: ",location.state ,"  ",location.state.price)
  console.log(user)
  useEffect(() => {
    const getClientSecret = async () => {
      console.log("inside get cllinet secret key");
      const paymentUrl='https://netflix-orwf.onrender.com'
      const response = await axios({
        method: 'post',
        url: `${paymentUrl}/payments/create`,
        data:{total:location.state?location.state.price*100:10}
      });
      console.log('out side get client secret ');
      console.log(response);
      setclientSecret(response.data.clientSecret)

    }
    getClientSecret()
  },[location.state])
  const cardElementOptions = {
    style: {
      base: {
        color: "#fff",
        padding: '30px',
        marginLeft: '30px',
        fontSize: '15px'
      }

    }
  }
  console.log('THE SECRET IS >>>>>',clientSecret)
  const handlesubmit = (event) => {
    event.preventDefault();
    setprocessing(true)
    stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:elements.getElement(CardElement)
      }
      
    }).then(({paymentIntent})=>{
      console.log(paymentIntent);
     dispatch(addtoPlaymovie({movieid:location.state.movieid,id:paymentIntent.id,uid:user.user.uid}))
      setsucceeded(true)
      seterror(null)
      setprocessing(false)
     Navigate('/play',{replace:true} )
    }).catch((err)=>{
      console.log(err)
      seterror(err.message)
    })

  }
  const handlechange = event => {
    setdisabled(event.empty);
    seterror(event.error ? event.error.message : '')
  }
  return (
    <div className='payment_container'>
      {/* <h1 style={{color:'white'}}>hello compount mount --- {location.state}</h1> */}
      <div className="payment_section">
        <div className="payment_title">
          <h1>Payment Method</h1>
        </div>
        <div className="payament_details">
          <div className="payment_tittle">
           {location.state.title}
          </div>
          <form className='payment_form' onSubmit={handlesubmit}>
            <CardElement onChange={handlechange} options={cardElementOptions} />
            <div className="payment_price_container">
              <CurrencyFormat
                renderText={(value) => (
                  <h3 style={{ color: '#fff' }}>total price : {value}</h3>
                )}
                decimalScale={2}
                value={location.state?location.state.price:10}
                displayType={'text'}
                thousandSeparator={true}
                prefix={"₹"}
              />
              <button disabled={processing || disabled || succeeded }>
                <span>{processing ? <p>processing</p> :
                  "Pay Now"}</span>
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Payment
