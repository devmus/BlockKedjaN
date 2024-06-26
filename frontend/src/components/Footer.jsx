import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { Link, NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>

      <div>
        &copy; devmus 2024
      </div>

      <div className="link-wrapper">
      <a href="https://github.com/devmus">
      <IconBrandLinkedin/>
      </a>
      <a href="https://www.linkedin.com/in/rasmus-wersall/">
      <IconBrandGithub/>
      </a>
      </div>
    </footer>
    
  )
}
