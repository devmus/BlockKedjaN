import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
<nav className="navbar">
	<ul>
		<li><NavLink to={"/blockkedjan/home"} className={({isActive}) => isActive ? "active" : ""}>Home</NavLink></li>
		<li><NavLink to={"/blockkedjan/transact"} className={({isActive}) => isActive ? "active" : ""}>Transact</NavLink></li>
		<li><NavLink to={"/blockkedjan/mine"} className={({isActive}) => isActive ? "active" : ""}>Mine</NavLink></li>
		<li><NavLink to={"/blockkedjan/explorer"} className={({isActive}) => isActive ? "active" : ""}>Explorer</NavLink></li>
	</ul>
</nav>
  )
}