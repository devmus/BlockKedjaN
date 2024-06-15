import { Link, NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
      <div>
      Copyright devmus 2024
      </div>
      <div className="admin-link">
        <NavLink to="/blockkedjan/admin" className={({isActive}) => isActive ? "active" : ""}>
          Admin Panel
        </NavLink>
      </div>
    </footer>
    
  )
}
