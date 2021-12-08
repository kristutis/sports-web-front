import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DEFAULT_BACKEND_PATH } from '../../App'
import { login, logout } from '../../state/actions/userActions'
import store from '../../state/state'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import './Navbar.css'

function Navbar() {
    const tokenData = useSelector(state => state && state.user)
    const isLoggedin = !!tokenData  

    const [isAdmin, setIsAdmin] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const [signupModal, setSignupModal] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClicked(!clicked)
    const closeMobileMenu = () => setClicked(false)

    const loginClicked = () => {
        closeMobileMenu()
        setSignupModal(false)
        setLoginModal(true)
    }
    const signupClicked = () => {
        closeMobileMenu()
        setLoginModal(false)
        setSignupModal(true)
    }
    const logoutClicked = () => {
        closeMobileMenu()
        store.dispatch(logout())
        alert('Successfully logged out!')
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    window.addEventListener('resize', showButton);

    useEffect(() => {
        showButton()

        if (!isLoggedin) {
            return
        }

        fetch(DEFAULT_BACKEND_PATH + 'users/details', {
            method: 'GET',
            headers: {
                'Authorization': tokenData.tokenType + ' ' + tokenData.accessToken,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(res => {
                setIsAdmin(res.role == 255)
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        GYM &nbsp;  
                        <i class='fas fa-dumbbell'></i>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={clicked ? 'fas fa-times' : 'fa fa-bars'} />
                    </div>
                    <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        {isAdmin && <li className='nav-item'>
                            <Link to='/users' className='nav-links' onClick={closeMobileMenu}>
                                Users
                            </Link>
                        </li>}
                        <li className='nav-item'>
                            <Link to='/trainers' className='nav-links' onClick={closeMobileMenu}>
                                Trainers
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                                Products
                            </Link>
                        </li>
                        {!isLoggedin && <li className='nav-item'>
                            <p className='nav-links' onClick={loginClicked}>
                                Log in
                            </p>
                        </li>}
                        {clicked && !isLoggedin && <li className='nav-item'>
                            <p className='nav-links-mobile' onClick={signupClicked}>
                                SIGN UP
                            </p>
                        </li>}
                        {clicked && isLoggedin && <li className='nav-item'>
                            <p className='nav-links-mobile' onClick={logoutClicked}>
                                LOG OUT
                            </p>
                        </li>}
                    </ul>
                    {button && !isLoggedin &&
                        <Button buttonStyle='btn--outline' onClick={signupClicked}>SIGN UP</Button>
                    }
                    {button && isLoggedin &&
                        <Button buttonStyle='btn--outline' onClick={logoutClicked}>LOG OUT</Button>
                    }
                </div>
            </nav>
            <Modal loginModal={loginModal} setLoginModal={setLoginModal} signupModal={signupModal} setSignupModal={setSignupModal}/>
        </>
    )
}

function GuestButtons(clicked, loginClicked, signupClicked) {
    return (
        <>
            <li className='nav-item'>
                <p className='nav-links' onClick={loginClicked}>
                    Log in
                </p>
            </li>
            {clicked && <li className='nav-item'>
                <p className='nav-links-mobile' onClick={signupClicked}>
                    SIGN UP
                </p>
            </li>}
        </>
    )    
}

export default Navbar
