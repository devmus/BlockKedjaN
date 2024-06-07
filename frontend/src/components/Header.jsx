import React from 'react'
import { Navbar } from './Navbar'

export const Header = () => {
  return (
    <header>
      <section className="first-row-wrapper">
        <div className="logo-wrapper">BlockKedjaN</div>
        <div className="user-wrapper">
          <div>Log in</div>
          <div>RPC</div>
        </div>
      </section>
      <Navbar />
    </header>
  )
}
