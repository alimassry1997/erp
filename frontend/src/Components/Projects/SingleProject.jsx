import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import "./SingleProject.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "react-tabs/style/react-tabs.css";
import ProjectStatus from "./ProjectStatus";
import { IoMdDoneAll } from "react-icons/io";
import { AiOutlineTeam } from "react-icons/ai";
import RelatedTeamsProject from "./RelatedTeamsProject";

const SingleProject = ({
  project,
  loadingProject,
  getProject,
  showAssignProjectFormPopup,
  showStatusProjectFormPopup,
  showDeleteProjectPopup,
  relatedUnassignedTeams,
  reloadProject,
  setReloadProject,
}) => {
  const { slug } = useParams();
  useEffect(() => {
    getProject(slug);
  }, [slug]);

  if (loadingProject) {
    return <Spinner />;
  } else {
    const { name, status, finished_at, slug: project_slug } = project;
    const size = relatedUnassignedTeams.length;
    return (
      <div className="single-project-container">
        <header>
          <div className="description">
            <h2>{name} Project</h2>
          </div>
          <div className="single-project-manage">
            <button
              className="btn edit-btn"
              // onClick={() => showEditProjectPopup({ name, size, slug })}
            >
              <FaEdit />
            </button>
            <button
              disabled={size > 0}
              className={`btn ${size > 0 ? "disabled-btn" : "delete-btn"}`}
              onClick={() => showDeleteProjectPopup({ name, slug })}
            >
              <FaTrashAlt />
            </button>
          </div>
        </header>
        <div className="status-project">
          <ProjectStatus
            status={status}
            showStatusProjectFormPopup={showStatusProjectFormPopup}
            name={name}
            project_slug={project_slug}
          />
          <div>
            {finished_at && <IoMdDoneAll />} {finished_at && finished_at}
          </div>
        </div>
        {size > 0 ? (
          <div className="single-project-teams-container">
            <h2>
              <AiOutlineTeam /> Teams
            </h2>
            <div className="teams">
              {relatedUnassignedTeams.map((team) => (
                <RelatedTeamsProject
                  key={team.id}
                  slug={team.slug}
                  name={team.name}
                  project_slug={project_slug}
                  showAssignProjectFormPopup={showAssignProjectFormPopup}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="no-data">No Teams Assigned</div>
        )}
      </div>
    );
  }
};

export default SingleProject;
