import {Link} from 'react-router-dom'
import './index.css'

const JobsItem = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData
  return (
    <Link to={`/jobs/${id}`} className="linkItem">
      <li className="jobListItem">
        <div className="image">
          <img
            src={companyLogoUrl}
            className="jobImage"
            alt="job details company logo"
          />
          <div>
            <h1 className="jobTitle">{title}</h1>
            <p className="jobRating">{rating}</p>
          </div>
        </div>
        <p className="jobLocation">{location}</p>
        <p className="jobEmploymentType">{employmentType}</p>
        <p className="jobPackage">{packagePerAnnum}</p>
        <h1 className="jobDescriptionTitle">Description</h1>
        <p className="jobDescription">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsItem
