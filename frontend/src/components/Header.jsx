import React, { useEffect, useState } from 'react'
import { IconUserCircle } from '@tabler/icons-react'
import { Navbar } from './Navbar'
import { Link } from 'react-router-dom'
import { Login } from './Login';
import { getMe } from '../services/auth';
import { UserInfo } from './Userinfo';

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [updateHeader, setUpdateHeader] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('loginInfo');
    if(token && token !== "undefined"){
    const getUserInfo = async () => {
      const userInfo = await getMe(token)
      setUserInfo(userInfo)
    return;
  }

  getUserInfo();
}
  }, [updateHeader])

  const handleClickLogin = () => {
    setShowLogin(true)
  }

  const handleClickProfile = () => {
    const token = localStorage.getItem('loginInfo');
    if(token && token !== "undefined"){
      setShowUserProfile(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loginInfo');
    setUserInfo(null)
    setShowUserProfile(false)
  }

  return (
    <header>
      <section className="first-row-wrapper">
        <div className="logo-wrapper"><Link to="/blockkedjan/home"><h1>Flowchain</h1></Link></div>
        <div className="user-wrapper">
          <div>
            <select>

            </select>
          </div>
          {!userInfo ? (
          <button onClick={handleClickLogin}>Log in / Sign up</button>
          ) : (
          <button onClick={handleClickProfile}><IconUserCircle/><div>{userInfo.fname}</div></button>
          )
          }
        </div>
      </section>
      <Navbar />
      {showLogin &&
        <Login setShowLogin={setShowLogin} setUserInfo={setUserInfo} setUpdateHeader={setUpdateHeader} updateHeader={updateHeader}/>
      }
      {showUserProfile && 
        <UserInfo setShowUserProfile={setShowUserProfile} userInfo={userInfo} setUserInfo={setUserInfo} handleLogout={handleLogout}/>
      }
    </header>
  )
}
