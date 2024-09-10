import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const findingJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="bgContainer">
      <Header />
      <div className="homeContent">
        <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
        <p className="homeDescription">
          Millions of people are searching for jobs
        </p>
        <div className="findJobsContainer">
          <Link to="/jobs" className="findJobsLink">
            <button
              type="button"
              onClick={findingJobs}
              className="findJobsButton"
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
