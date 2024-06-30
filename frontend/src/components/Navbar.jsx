import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
<nav className="navbar">
	<ul>
		<li><NavLink to={"/flowchain/home"} className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
		<li><NavLink to={"/flowchain/transact"} className={({isActive}) => isActive ? "active" : ""}>Transact</NavLink></li>
		<li><NavLink to={"/flowchain/mine"} className={({isActive}) => isActive ? "active" : ""}>Mine</NavLink></li>
		<li><NavLink to={"/flowchain/explorer"} className={({isActive}) => isActive ? "active" : ""}>Explorer</NavLink></li>
	</ul>
</nav>
  )
}