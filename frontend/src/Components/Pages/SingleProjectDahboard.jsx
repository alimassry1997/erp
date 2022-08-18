import { useState, useEffect } from "react";
// import Popup from "../Layout/Popup";
// import axios from "axios";
import { useParams } from "react-router-dom";
import SingleProject from "../Projects/SingleProject";

const SingleProjectDashboard = ({
  project,
  loadingProject,
  getProject,
  // token,
}) => {
  const { slug } = useParams();
  /**
   * Edit Project Form State Popup
   */
  // const [showEditProjectForm, setShowEditProjectForm] = useState(false);
  // const [editProject, setEditProject] = useState("");
  //
  // /**
  //  * Delete Project Alert State Popup
  //  */
  // const [showDeleteProjectForm, setShowDeleteProjectForm] = useState(false);
  // const [deleteProject, setDeleteProject] = useState("");
  //
  /**
   * Refresh Projects Table after each add, edit and delete request
   */
  const [reloadProject, setReloadProject] = useState(false);

  /**
   * Popup Functions
   */
  // const showEditProjectPopup = (project) => {
  //   setEditProject(project);
  //   setShowEditProjectForm(true);
  // };
  //
  // const showDeleteProjectPopup = (project) => {
  //   setDeleteProject(project);
  //   setShowDeleteProjectForm(true);
  // };

  useEffect(() => {
    getProject(slug);
  }, [reloadProject]);

  return (
    <>
      <SingleProject
        project={project}
        loadingProject={loadingProject}
        getProject={getProject}
        // showEditProjectPopup={showEditProjectPopup}
        // showDeleteProjectPopup={showDeleteProjectPopup}
      />
      {/* Projects Edit Form Popup */}
      {/*{showEditProjectForm && (*/}
      {/*    <Popup*/}
      {/*        show={showEditProjectForm}*/}
      {/*        setShow={setShowEditProjectForm}*/}
      {/*        component={*/}
      {/*            <EditProjectForm*/}
      {/*                token={token}*/}
      {/*                reloadProjects={reloadProject}*/}
      {/*                setReloadProjects={setReloadProject}*/}
      {/*                getEmployees={getEmployees}*/}
      {/*                loadingEmployees={loadingEmployees}*/}
      {/*                setLoadingEmployees={setLoadingEmployees}*/}
      {/*                employeesList={employeesList}*/}
      {/*                setEmployeesList={setEmployeesList}*/}
      {/*                editProject={editProject}*/}
      {/*            />*/}
      {/*        }*/}
      {/*    />*/}
      {/*)}*/}
      {/*/!* Projects Delete Form Popup *!/*/}
      {/*{showDeleteProjectForm && (*/}
      {/*    <Popup*/}
      {/*        show={showDeleteProjectForm}*/}
      {/*        setShow={setShowDeleteProjectForm}*/}
      {/*        component={*/}
      {/*            <DeleteProjectAlert*/}
      {/*                token={token}*/}
      {/*                reloadProjects={reloadProject}*/}
      {/*                setReloadProjects={setReloadProject}*/}
      {/*                deleteProject={deleteProject}*/}
      {/*            />*/}
      {/*        }*/}
      {/*    />*/}
      {/*)}*/}
    </>
  );
};

export default SingleProjectDashboard;
