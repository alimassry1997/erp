import { Link } from "react-router-dom";

const RelatedEmployeesProject = ({
  first_name,
  last_name,
  picture,
  role_name,
  email,
}) => {
  return (
    <div className="employees-project-card">
      <div className="employees-project-image">
        <img src={picture} alt="employee picture" />
      </div>
      <div className="employees-project-content">
        <h3>
          <Link to={`/employees/${email}`}>
            {first_name} {last_name}
          </Link>
        </h3>
        <p>@{role_name}</p>
      </div>
    </div>
  );
};

export default RelatedEmployeesProject;
