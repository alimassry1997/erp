import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import "./SingleProject.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "react-tabs/style/react-tabs.css";
import ProjectStatus from "./ProjectStatus";
import { IoMdDoneAll } from "react-icons/io";

const SingleProject = ({ project, loadingProject, getProject }) => {
  const { slug } = useParams();
  useEffect(() => {
    getProject(slug);
  }, [slug]);

  if (loadingProject) {
    return <Spinner />;
  } else {
    const { name, status, finished_at } = project;
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
              className="btn delete-btn"
              // onClick={() => showDeleteProjectPopup({ name, slug })}
            >
              <FaTrashAlt />
            </button>
          </div>
        </header>
        <div className="status-project">
          <ProjectStatus status={status} />
          <div>
            {finished_at && <IoMdDoneAll />} {finished_at && finished_at}
          </div>
        </div>
      </div>
    );
  }
};

export default SingleProject;
