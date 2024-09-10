import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import JobsItem from '../JobsItem'
import Header from '../Header'
import Profile from '../Profile'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobsSection extends Component {
  state = {
    jobsData: [],
    apiStatus: apiConstants.initial,
    searchInput: '',
    activeSalaryRange: '',
    activeempType: [],
  }

  componentDidMount = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {activeSalaryRange, activeempType, searchInput} = this.state
    const empTypes = activeempType.join(',')
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${empTypes}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({apiStatus: apiConstants.success, jobsData: formattedData})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failureView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  onChangeSearch = event => this.setState({searchInput: event.target.value})

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  renderSuccessView = () => {
    const {jobsData, searchInput} = this.state
    return (
      <div>
        <div className="searchInputContainer">
          <input
            type="search"
            className="searchInput"
            onKeyDown={this.onEnterSearchInput}
            placeholder="Search"
            onChange={this.onChangeSearch}
            value={searchInput}
          />
          <button
            aria-label="search"
            type="button"
            className="searchButton"
            data-testid="searchButton"
          >
            <BsSearch className="searchIcon" />
          </button>
        </div>
        {jobsData.length === 0 ? (
          <div className="noJobsView">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
          </div>
        ) : (
          <ul className="jobsList">
            {jobsData.map(eachItem => (
              <JobsItem jobsData={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderJobsDetailSection = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  changeActiveEmpType = id => {
    this.setState(prevState => {
      const {activeempType} = prevState
      if (activeempType.includes(id)) {
        return {activeempType: activeempType.filter(empType => empType !== id)}
      }
      return {activeempType: [...activeempType, id]}
    }, this.getJobDetails)
  }

  changeActiveSalaryRange = id => {
    this.setState({activeSalaryRange: id}, this.getJobDetails)
  }

  render() {
    const {activeSalaryRange, activeempType} = this.state
    return (
      <div>
        <Header />
        <div className="jobsSectionContainer">
          <div>
            <div className="profileContainer">
              <Profile />
            </div>
            <div>
              <FiltersGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                activeSalaryRange={activeSalaryRange}
                activeempType={activeempType}
                changeActiveEmpType={this.changeActiveEmpType}
                changeActiveSalaryRange={this.changeActiveSalaryRange}
              />
            </div>
          </div>
          <div>{this.renderJobsDetailSection()}</div>
        </div>
      </div>
    )
  }
}

export default JobsSection
