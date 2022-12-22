import Banner from './components/Banner/Banner';
import Footer from './components/footer/footer';
import Login from './components/Login/Login';
import Mylist from './components/Mylist/Mylist';
import NavBar from './components/NavBar/NavBar';
import Payment from './components/payment/Payment';
import Play from './components/Play/Play';
import PurchasedList from './components/PurchasedList/PurchasedList';
import RowPost1 from './components/RowPost/RowPost1';
import SearchPage from './components/SearchPage/SearchPage';
import Signup from './components/Signup/Signup';
import View from './components/view/View';

import './App.css'
import './components/Banner/Banner.css';
import './components/NavBar/NavBar.css';
import './components/RowPost/RowPost.css';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { action, originals, popular } from './Services/urls';
import { Elements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { auth } from './Firebase/Config';
import { useDispatch, useSelector } from 'react-redux';
import { setcurrentuser } from './Redux/User/User-action';

function App() {
  const promise = loadStripe("pk_test_51MDnf1SGSXt8TKLFrdHWnrbXgb7JtHgCqNuSEMhJKfgZhPfGHC2VhGnieDRGCXKn5mhzCnJgNodB9a2ykkmlbTcE00Jdxu8OG1")
  const dispatch=useDispatch()
  var user=useSelector((state)=>(state.user.user))

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      dispatch(setcurrentuser(user))
    })
  },[user])
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element=
            {
              <>
                <Banner />
                <RowPost1 url={action} title='Action'  isredux />
                <RowPost1 url={originals} title='Originals' isredux />
                <RowPost1 url={popular} title='Popular' isredux />
                <Footer />
              </>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/:id' element={<View />} />
          <Route path='/mylist' element={<Mylist />} />
          <Route path='/payment' element={<><Elements stripe={promise}><Payment /></Elements></>} />
          <Route path='/play' element={<Play />} />
          <Route path='/purchasedlist' element={<PurchasedList />} />
          <Route path='searchresults' element={<SearchPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App;

