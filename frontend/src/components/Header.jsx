import React from 'react'
import { Navbar } from './Navbar'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
      <section className="first-row-wrapper">
        <div className="logo-wrapper"><Link to="/blockkedjan/home"><h1>BlockKedjaN</h1></Link></div>
        <div className="user-wrapper">
          <div>Log in</div>
          <div>RPC</div>
        </div>
      </section>
      <Navbar />
    </header>
  )
}
