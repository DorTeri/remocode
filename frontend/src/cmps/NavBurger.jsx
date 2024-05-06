import React from 'react'

const NavBurger = ({ isOpen, setIsOpen }) => {
    return (
        <button className={`nav-burger ${isOpen ? 'hide' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}

export default NavBurger