import { useEffect } from "react";
import "./Teams.css";
import Spinner from "../Layout/Spinner";
import Team from "./Team";
import { FaPlusSquare } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";

const Teams = ({ teams, fetchTeams, loadingTeams }) => {
  document.title = "Teams Dashboard | ERP";
  useEffect(() => {
    fetchTeams();
  }, []);
  if (loadingTeams) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard">
        <div className="header">
          <h2>
            <AiOutlineTeam />
            Teams Management
          </h2>
          <button className="btn add-btn">
            <FaPlusSquare />
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-teams">
            <thead>
              <tr>
                <th>Name</th>
                <th>Team Size</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <Team
                  key={team.id}
                  name={team.name}
                  size={team.users_count}
                  slug={team.slug}
                  created_at={team.created_at}
                  updated_at={team.updated_at}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Teams;
