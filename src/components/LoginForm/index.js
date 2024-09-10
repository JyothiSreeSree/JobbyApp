import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrMsg: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errormsg => {
    this.setState({errorMsg: errormsg, showErrMsg: true})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrMsg, errorMsg} = this.state
    return (
      <div className="bgContainerLogin">
        <div className="loginFormContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
          <form onSubmit={this.submitForm} className="loginForm">
            <label htmlFor="userName" className="labelText">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              value={username}
              onChange={this.onChangeUserName}
              className="inputField"
            />
            <label htmlFor="password" className="labelText">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
              className="inputField"
            />
            <button type="submit" className="loginButton">
              Login
            </button>
            {showErrMsg && <p className="errorMessage">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
