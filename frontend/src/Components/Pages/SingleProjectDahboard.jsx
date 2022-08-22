import { useState, useEffect } from "react";
// import Popup from "../Layout/Popup";
// import axios from "axios";
import { useParams } from "react-router-dom";
import SingleProject from "../Projects/SingleProject";
import Popup from "../Layout/Popup";
import AssignRolesForm from "../Projects/AssignRolesForm";
import ChangeProjectStatus from "../Projects/ChangeProjectStatus";
import DeleteProjectAlert from "../Projects/DeleteProjectAlert";

const SingleProjectDashboard = ({
  project,
  loadingProject,
  getProject,
  token,
  roles,
  fetchRoles,
  getTeam,
  loadingTeam,
  relatedEmployeesTeam,
  loadingRoles,
  relatedUnassignedTeams,
}) => {
  const { slug } = useParams();

  /**
   * Assign Employees to project
   */
  const [showAssignProjectForm, setShowAssignProjectForm] = useState(false);
  const [assignTeam, setAssignTeam] = useState("");

  /**
   * Change Project Status
   */
  const [showStatusProjectForm, setShowStatusProjectForm] = useState(false);
  const [statusProject, setStatusProject] = useState("");

  /**
   * Edit Project Form State Popup
   */
  // const [showEditProjectForm, setShowEditProjectForm] = useState(false);
  // const [editProject, setEditProject] = useState("");
  //
  /**
   * Delete Project Alert State Popup
   */
  const [showDeleteProjectAlert, setShowDeleteProjectAlert] = useState(false);
  const [deleteProject, setDeleteProject] = useState("");

  /**
   * Refresh Projects Table after each add, edit and delete request
   */
  const [reloadProject, setReloadProject] = useState(false);

  /**
   * Popup Functions
   */
  const showAssignProjectFormPopup = (team) => {
    setAssignTeam(team);
    setShowAssignProjectForm(true);
  };
  const showStatusProjectFormPopup = (project) => {
    setStatusProject(project);
    setShowStatusProjectForm(true);
  };
  // const showEditProjectPopup = (project) => {
  //   setEditProject(project);
  //   setShowEditProjectForm(true);
  // };
  const showDeleteProjectPopup = (project) => {
    setDeleteProject(project);
    setShowDeleteProjectAlert(true);
  };

  useEffect(() => {
    getProject(slug);
    fetchRoles();
  }, [reloadProject]);

  return (
    <>
      <SingleProject
        project={project}
        loadingProject={loadingProject}
        getProject={getProject}
        relatedUnassignedTeams={relatedUnassignedTeams}
        showAssignProjectFormPopup={showAssignProjectFormPopup}
        showStatusProjectFormPopup={showStatusProjectFormPopup}
        // showEditProjectPopup={showEditProjectPopup}
        showDeleteProjectPopup={showDeleteProjectPopup}
        setReloadProject={setReloadProject}
        reloadProject={reloadProject}
      />
      {/* Projects Edit Form Popup */}
      {showAssignProjectForm && (
        <Popup
          show={showAssignProjectForm}
          setShow={setShowAssignProjectForm}
          component={
            <AssignRolesForm
              token={token}
              roles={roles}
              loadingRoles={loadingRoles}
              assignTeam={assignTeam}
              getTeam={getTeam}
              relatedEmployeesTeam={relatedEmployeesTeam}
              loadingTeam={loadingTeam}
            />
          }
        />
      )}
      {/* Project Status Form Popup */}
      {showStatusProjectForm && (
        <Popup
          show={showStatusProjectForm}
          setShow={setShowStatusProjectForm}
          component={
            <ChangeProjectStatus
              token={token}
              reloadProject={reloadProject}
              setReloadProject={setReloadProject}
              statusProject={statusProject}
            />
          }
        />
      )}
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
      {/* Projects Delete Form Popup */}
      {showDeleteProjectAlert && (
        <Popup
          show={showDeleteProjectAlert}
          setShow={setShowDeleteProjectAlert}
          component={
            <DeleteProjectAlert
              token={token}
              reloadProjects={reloadProject}
              setReloadProjects={setReloadProject}
              deleteProject={deleteProject}
            />
          }
        />
      )}
    </>
  );
};

export default SingleProjectDashboard;
