import React from 'react'
import vscode from '../assets/images/vscode.png'
import { navItems } from '../constants'
import { NavLink, useNavigate } from 'react-router-dom'

const AppHeader = () => {
  

  return (
    <nav className='nav-container'>
      <div className='nav-content'>
        <NavLink to={'/'} className='nav-logo'>
          <img src={vscode} />
          <h3>Remocode</h3>
        </NavLink>
        <div className='nav-items'>
          {
            navItems.map(item => (
              <NavLink key={item.title} to={item.path}
              className={({isActive}) => isActive ? 'active' : ''}>
                {item.title}
              </NavLink>
            ))
          }
        </div>
      </div>
    </nav>
  )
}

export default AppHeader