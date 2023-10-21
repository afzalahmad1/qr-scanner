import React from 'react'
import "./styles.css"
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className='navbar'>
        <NavLink to="/" ><h3>Signup</h3></NavLink>
        <NavLink to="/login" ><h3>Login</h3></NavLink>
        <NavLink to="/upload" ><h3>File</h3></NavLink>
      
    </div>
  )
}

export default Header;