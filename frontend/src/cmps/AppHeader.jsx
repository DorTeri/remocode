import React, { useState } from 'react'
import vscode from '../assets/images/vscode.png'
import { navItems } from '../constants'
import { NavLink, useNavigate } from 'react-router-dom'
import NavBurger from './NavBurger'
import SideNav from './SideNav'

const AppHeader = () => {

  const [isOpen, setIsOpen] = useState()

  return (
    <nav className='nav-container'>
      <div className='nav-content'>
        <NavLink to={'/'} className='nav-logo'>
          <img alt='logo' src={vscode} />
          <h3>Remocode</h3>
        </NavLink>

        {/* Nav links in normal layout */}
        <div className='nav-items'>
          {
            navItems.map(item => (
              <NavLink key={item.title} to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}>
                {item.title}
              </NavLink>
            ))
          }
        </div>

        {/* Burger in tablet and less layout */}
        <NavBurger isOpen={isOpen} setIsOpen={setIsOpen} />
        <SideNav isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
    </nav>
  )
}

export default AppHeader