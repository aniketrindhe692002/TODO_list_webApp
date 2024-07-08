import React from 'react'
import profile from '../assets/man (6).png'
import logo from '../assets/sticky-note.png'
import './Navbar.css'

function Navbar() {
    return (
        <>
            <div className='todo-navbar'>
                <div className='todo-logo'>
                    <img className='todo-logo-img' src={logo} />
                </div>
                <div className='todo-profile'>
                    <img className='todo-profile-img' src={profile} />
                </div>
            </div>
        </>
    )
}

export default Navbar
