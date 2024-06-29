import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'
import { API_URL } from '../services/config'

export const Footer = () => {
  return (
    <footer>

      <div>
        &copy; devmus 2024
      </div>

      <div className="api-docs">
      <a href={API_URL} target="_blank"><span>API docs</span></a>
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
