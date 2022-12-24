import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import { auth } from '../../Firebase/Config'
import { getsearchData } from '../../Redux/Search/Search-action'
import Signt from '../Signout/Signout'
function NavBar() {
    const Navigate = useNavigate()
    const location = useLocation()
    const [show, setshow] = useState(false)
    const [currentroute, setcurrentroute] = useState('/')
    const Dispatch = useDispatch()
    const username = useSelector(({ user }) => (user.user))
    const [popus, setpopus] = useState(false)

    useEffect(() => {
        if (window.innerWidth > 800)
            setshow(true)
    }, [username])

    var Logout = async () => {
        await signOut(auth).then(() => {
            // Dispatch(logoutcurrentuser())
            window.location.href = '/'

        })
    }
    const handlecick = () => {
        setshow(!show)
    }
    const handlechange = (event) => {
        const { value } = event.target
        if (Number(value.length >= 1 && location.pathname !== '/searchresults')) {
            setcurrentroute(location.pathname)
            Navigate('/searchresults')
        } else if (Number(value.length === 0)) {
            Navigate(currentroute)
        }
        console.log(Number(value));
        return value ? Dispatch(getsearchData(value)) : null;
    }
    return (
        <div className='navbar'>
            <img onClick={() => Navigate('/')} className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix logo" />
            <img className='avatar' src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt='avatar' />

            {show && <nav style={location.pathname === '/play' || location.pathname === '/payment' ? { display: 'none' } : { display: 'block' }} >
                <ul>
                    <li>
                        {username ? <p className='name' onClick={() => setpopus(true)} >hello {username.displayName}</p> :
                            <p className='name'  >hello Gest</p>}
                    </li>
                    <li onClick={() => {
                        Navigate('/mylist')
                        setshow(!show)
                    }}>MyList</li>
                    <li onClick={() => {
                        Navigate('/purchasedlist')
                        setshow(!show)
                    }}>PurchasedList</li>
                    {username ? '' : <li onClick={() => {
                        Navigate('/login')
                        setshow(!show)
                    }}>Login</li>}
                </ul>
            </nav>}
            <div className="header-searchbar" style={location.pathname === '/play' || location.pathname === '/payment' ? { display: 'none' } : { display: 'block' }}>
                <div className="searchbar-container1">
                    <div className="seacrhbar-container2">
                        <span className="header-searchicon">
                            <div className="row-container">

                                <i style={{ marginTop: '10px' }} class="fa fa-search" />
                                <input
                                    onChange={handlechange}
                                    style={{ margin: '0' }} type="search" id='search' placeholder='Movies ,TV Shows...' />
                            </div>
                        </span>

                    </div>
                </div>
            </div>
            <nav>
                <ul>

                </ul>
            </nav>


            <Signt trigger={popus} settrigger={setpopus}>
                <div className='signOut-content'>
                    <h3>Dear,{username && username.displayName}  are you want SignOut</h3>
                    <button onClick={Logout}>SignOut</button>
                </div>
            </Signt>
            <i style={location.pathname === '/play' || location.pathname === '/payment' || window.innerWidth > 800 ? { display: 'none' } : { display: 'block' }}
                onClick={handlecick} class="fas fa-bars fa-2x menu"></i>
        </div>
    )
}

export default NavBar
