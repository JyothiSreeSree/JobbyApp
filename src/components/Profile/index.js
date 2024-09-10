import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Profile extends Component {
  state = {profileData: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const convertedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiConstants.success,
        profileData: convertedData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onRetrying = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="profileFailureContainer">
      <button type="button" className="retryButton" onClick={this.onRetrying}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="profileLoaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state
    return (
      <div className="profileSuccessContainer">
        <img
          src={profileData.profileImageUrl}
          alt="profile"
          className="profileImage"
        />
        <h1 className="profileName">{profileData.name}</h1>
        <p className="profileBio">{profileData.shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }
}

export default Profile
