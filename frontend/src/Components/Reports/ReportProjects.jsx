import { Link } from "react-router-dom";

const ReportProjects = ({ name, role, slug }) => {
  return (
    <div>
      <h3>
        <Link to={`/projects/${slug}`}>{name}</Link>
      </h3>
      <span>@{role}</span>
    </div>
  );
};

export default ReportProjects;
