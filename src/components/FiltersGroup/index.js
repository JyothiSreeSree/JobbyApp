import './index.css'

const FiltersGroup = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    changeActiveEmpType,
    changeActiveSalaryRange,
  } = props

  const onSelectingSalaryRange = event => {
    changeActiveSalaryRange(event.target.value)
  }

  const renderSalaryRangeList = () => (
    <div className="salaryRangeContainer">
      <h1 className="salaryRangeHeading">Salary Range</h1>
      <ul className="salaryRangeList">
        {salaryRangesList.map(each => (
          <li key={each.salaryRangeId} className="salaryRangeItem">
            <input
              type="radio"
              id={each.label}
              name="salaryRange"
              value={each.salaryRangeId}
              onChange={onSelectingSalaryRange}
              className="salaryRangeInput"
            />
            <label htmlFor={each.label} className="salaryRangeLabel">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const onSelectingEmpType = event => {
    changeActiveEmpType(event.target.value)
  }

  const renderEmploymentTypesList = () => (
    <div className="employmentTypesContainer">
      <h1 className="employmentTypeHeading">Type of Employment</h1>
      <ul className="employmentTypesList">
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId} className="employmentTypeItem">
            <input
              type="checkbox"
              id={each.label}
              name={each.label}
              value={each.employmentTypeId}
              onChange={onSelectingEmpType}
              className="employmentTypeInput"
            />
            <label htmlFor={each.label} className="employmentTypeLabel">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filtersGroupContainer">
      {renderEmploymentTypesList()}
      {renderSalaryRangeList()}
    </div>
  )
}

export default FiltersGroup
