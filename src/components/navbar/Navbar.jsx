import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../button/Button'
import './Navbar.css'

function Navbar() {
    const [clicked, setClicked] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClicked(!clicked)
    const closeMobileMenu = () => setClicked(false)

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
                        <li className='nav-item'>
                            <Link to='/log-in' className='nav-links' onClick={closeMobileMenu}>
                                Log in
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                                SIGN UP
                            </Link>
                        </li>
                    </ul>
                    {button && 
                        <Button buttonStyle='btn--outline'>SIGN UP</Button>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar
