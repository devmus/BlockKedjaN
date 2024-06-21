import React, { useState } from 'react'
import axios from "axios";
import { getMe, login, register } from '../services/auth';

export const Login = ({setShowLogin, setUserInfo, setUpdateHeader, updateHeader}) => {

  const [loginInfo, setLoginInfo] = useState({})
  const [signupInfo, setSignupInfo] = useState({})
  const [showSignup, setShowSignup] = useState(false)

  const handleChangeLogin = (e) => {
    const { name, value } = e.target
    setLoginInfo(prev => ({...prev, [name]: value}))
  }

  const handleChangeSignup = (e) => {
    const { name, value } = e.target
    setSignupInfo(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(showSignup) {
      //signup
      try {
        const response = await register(signupInfo);
        if(response.statusCode = 200) {
        localStorage.setItem("loginInfo", response.token)
        setUserInfo(signupInfo.fname)
        setUpdateHeader(prevState => !prevState)
        } else {
          alert(`${response.error}`)
          return;
        }
      } catch (error) {
        console.log("!error", error);
      }
    } else {
      //login
      try {
        const response = await login(loginInfo);
        if(response.statusCode === 200) {
        localStorage.setItem("loginInfo", response.token)
        const userInfo = await getMe(response.token)
        setUserInfo(userInfo)
        setUpdateHeader(prevState => !prevState)
        } else {
          alert(`${response.error}`)
          return;
        }
      } catch (error) {
        console.log("!error", error);
      }
    }
    setShowLogin(false)

  }

  const handleClick = (e) => {
    e.preventDefault();
    setShowSignup(true)
  }

  return (
    <div className="login-wrapper">

      {showSignup === false ? (
      <div className="login-frame">
        <button className="exit-button" onClick={() => setShowLogin(false)}>X</button>
        <form onSubmit={handleSubmit}>
          <h2>Enter your login information</h2>
          <div className="form-control">
            <label htmlFor="login-input-email">E-mail:</label>
            <input type="text" id="login-input-email" name="email" onChange={handleChangeLogin}></input>
          </div>
          <div className="form-control">
            <label htmlFor="login-input-password">Password:</label>
            <input type="password" id="login-input-password" name="password" onChange={handleChangeLogin}></input>
          </div>
          <div className="button-control">
          <button className="application-button">Login</button>
          </div>
        </form>
        <div className="sign-up-button-wrapper">
        <span>If you dont have an account yet, please sign up.</span>
          <div className="button-control">
            <button className="application-button" onClick={handleClick}>Sign up</button>
          </div>
        </div>
      </div>
      ) : (
        <div className="sign-up-frame">
        <button className="exit-button" onClick={() => setShowLogin(false)}>X</button>
        <form onSubmit={handleSubmit}>
          <h2>Enter your sign up information</h2>
          <div className="form-control">
            <label htmlFor="signup-input-email">E-mail:</label>
            <input type="text" id="signup-input-email" name="email" onChange={handleChangeSignup}></input>
          </div>
          <div className="form-control">
            <label htmlFor="signup-input-fname">First name:</label>
            <input type="text" id="signup-input-fname" name="fname" onChange={handleChangeSignup}></input>
          </div>
          <div className="form-control">
            <label htmlFor="signup-input-lname">Last name:</label>
            <input type="text" id="signup-input-lname" name="lname" onChange={handleChangeSignup}></input>
          </div>
          <div className="form-control">
            <label htmlFor="signup-input-password">Password:</label>
            <input type="password" id="signup-input-password" name="password" onChange={handleChangeSignup}></input>
          </div>
          <div className="button-control">
          <button className="application-button">Sign up</button>
          </div>
        </form>
      </div>
      )}
    </div>
  )
}
