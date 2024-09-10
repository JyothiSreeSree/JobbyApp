import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLoggingOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navBar">
      <div className="navContent">
        <li className="logoItem">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogo"
            />
          </Link>
        </li>
        <ul className="navLinks">
          <li className="navLinkItem">
            <Link to="/" className="navLink">
              <h1 className="navHeading">Home</h1>
            </Link>
          </li>
          <li className="navLinkItem">
            <Link to="/jobs" className="navLink">
              <h1 className="navHeading">Jobs</h1>
            </Link>
          </li>
          <li className="navLinkItem">
            <button
              type="button"
              onClick={onLoggingOut}
              className="logoutButton"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
