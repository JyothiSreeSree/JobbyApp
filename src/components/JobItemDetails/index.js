import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobsItem from '../JobsItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    skills: [],
    similarJobs: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jobDetails = data.job_details
      const formattedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
      }
      const formattedSkillsData = jobDetails.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const formattedSimilarJobsData = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        similarJobs: formattedSimilarJobsData,
        jobDetails: formattedData,
        skills: formattedSkillsData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loaderContainer" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  onRetrying = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImage"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failureDescription">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.onRetrying} className="retryButton">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {skills, similarJobs, jobDetails} = this.state

    return (
      <div className="jobDetailsContainer">
        <Header />
        <div className="jobDetailsContent">
          <h1 className="jobTitle">{jobDetails.title}</h1>
          <img
            src={jobDetails.companyLogoUrl}
            alt="job details company logo"
            className="companyLogo"
          />
          <p className="rating">{jobDetails.rating}</p>
          <p className="location">{jobDetails.location}</p>
          <p className="employmentType">{jobDetails.employmentType}</p>
          <p className="packagePerAnnum">{jobDetails.packagePerAnnum}</p>
          <h1 className="sectionHeading">Description</h1>
          <a href={jobDetails.companyWebsiteUrl} className="companyLink">
            Visit
          </a>
          <p className="jobDescription">{jobDetails.jobDescription}</p>
          <h1 className="sectionHeading">Skills</h1>
          <ul className="skillsList">
            {skills.map(each => (
              <li key={each.name} className="skillItem">
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skillImage"
                />
                <p className="skillName">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="sectionHeading">Life at Company</h1>
          <p className="lifeAtCompanyDescription">
            {jobDetails.lifeAtCompany.description}
          </p>
          <img
            src={jobDetails.lifeAtCompany.imageUrl}
            alt="life at company"
            className="lifeAtCompanyImage"
          />
          <h1 className="sectionHeading">Similar Jobs</h1>
          <ul className="similarJobsList">
            {similarJobs.map(each => (
              <li key={each.id} className="similarJobItem">
                <img
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                  className="similarJobCompanyLogo"
                />
                <JobsItem jobsData={each} />
              </li>
            ))}
          </ul>
        </div>
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

  render() {
    return <div>{this.renderJobsDetailSection()}</div>
  }
}

export default JobItemDetails
