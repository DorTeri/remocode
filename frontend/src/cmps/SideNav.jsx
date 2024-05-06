import React from 'react'
import { navItems } from '../constants'
import { useNavigate } from 'react-router-dom'

const SideNav = ({ isOpen, setIsOpen }) => {

    const navigate = useNavigate()

    const handleNavigate = (path) => {
        setIsOpen(false)
        navigate(path)
    }

    return (
        <nav className={`side-nav ${isOpen ? 'open' : ''}`}>
            <div className='close-button' onClick={() => setIsOpen(false)}>
                x
            </div>
            {
                navItems.map(item => (
                    <div key={item.title} onClick={() => handleNavigate(item.path)}>
                        {item.title}
                    </div>
                ))
            }
        </nav>
    )
}

export default SideNav