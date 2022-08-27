import "./SingleTeamEmployees.css";
import { Link } from "react-router-dom";

const SingleProjectTeam = ({ name, slug }) => {
  return (
    <div>
      <h3>{name}</h3>
      <Link to={`/projects/${slug}`} className="btn dark-btn">
        View
      </Link>
    </div>
  );
};

export default SingleProjectTeam;
