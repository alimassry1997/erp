import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import "./SingleTeam.css";
import { HiUserGroup } from "react-icons/hi";

const SingleTeam = ({ team, loadingTeam, getTeam }) => {
  const { slug } = useParams();

  useEffect(() => {
    getTeam(slug);
  }, [slug]);

  if (loadingTeam) {
    return <Spinner />;
  } else {
    const {
      team: { name, users },
    } = team;
    return (
      <div className="single-team-container">
        <header>
          <h2>{name} Team</h2>
          <div>
            <HiUserGroup />
            Team Size: {users.length}
          </div>
        </header>
        <h3>Employees Assigned</h3>
      </div>
    );
  }
};

export default SingleTeam;
