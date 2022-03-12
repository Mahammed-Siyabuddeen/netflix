import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { action, originals, popular } from './Services/urls';
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

function App() {
  const promise = loadStripe("pk_test_51K8OhASItmU7WYKckffrzhBlepcBj2Z04p1JDSy3z4xxvpmm4aRKz8qxkauvlQsF8WbD28xLN6hM8mRAYKOtELTK00fA3WSyXT")

  // auth.onAuthStateChanged(user => {
  //   Dispatch(setcurrentuser(user ? user.displayName : user))
  // })
  return (
    <div>
      {/* <Banner />
      <RowPost1 url={action} title='action' isredux /> */}

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

