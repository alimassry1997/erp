import "./Projects.css";
import Spinner from "../Layout/Spinner";
import { AiOutlineProject } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import Project from "./Project";

function Projects({ projects, loadingProjects, showAddProjectFormPopup }) {
  document.title = "Projects Dashboard | ERP";
  if (loadingProjects) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard">
        <div className="header">
          <h2>
            <AiOutlineProject />
            Projects Management
          </h2>
          <button
            className="btn dark-btn"
            onClick={() => showAddProjectFormPopup()}
          >
            <FaPlusSquare />
          </button>
        </div>
        <div className="projects-container">
          {projects.map((project) => (
            <Project
              key={project.id}
              name={project.name}
              slug={project.slug}
              status={project.status}
              finished_at={project.finished_at}
              created_at={project.created_at}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Projects;
