import { useState, useEffect } from "react";
import Popup from "../Layout/Popup";
import { useParams } from "react-router-dom";
import SingleEmployee from "../Employees/SingleEmployee";
import DeleteEmployeeAlert from "../Employees/DeleteEmployeeAlert";
import EditAdminForm from "../Admins/EditAdminForm";
import AssignSkillsForm from "../Employees/AssignSkillForm";

const SingleEmployeeDashboard = ({
  employee,
  loadingEmployee,
  getEmployee,
  empTeam,
  skills,
  fetchSkills,
  loadingSkills,
  token,
}) => {
  const { email } = useParams();

  /**
   * Assign Employee Form State Popup
   */
  const [showAssignEmployeeForm, setShowAssignEmployeeForm] = useState(false);
  const [assignEmployee, setAssignEmployee] = useState("");

  /**
   * Edit Employee Form State Popup
   */
  const [showEditEmployeeForm, setShowEditEmployeeForm] = useState(false);
  const [editAdmin, setEditAdmin] = useState("");

  /**
   * Delete Employee Alert State Popup
   */
  const [showDeleteEmployeeForm, setShowDeleteEmployeeForm] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState("");

  /**
   * Refresh Employees Table after each add, edit and delete request
   */
  const [reloadEmployee, setReloadEmployee] = useState(false);

  /**
   * Popup Functions
   */
  const showEditEmployeePopup = (user) => {
    setEditAdmin(user);
    setShowEditEmployeeForm(true);
  };

  const showAssignEmployeePopup = (user) => {
    setAssignEmployee(user);
    setShowAssignEmployeeForm(true);
  };

  const showDeleteEmployeePopup = (user) => {
    setDeleteEmployee(user);
    setShowDeleteEmployeeForm(true);
  };

  useEffect(() => {
    getEmployee(email);
  }, [reloadEmployee]);

  return (
    <>
      <SingleEmployee
        employee={employee}
        loadingEmployee={loadingEmployee}
        getEmployee={getEmployee}
        empTeam={empTeam}
        showEditEmployeePopup={showEditEmployeePopup}
        showDeleteEmployeePopup={showDeleteEmployeePopup}
        showAssignEmployeePopup={showAssignEmployeePopup}
      />
      {/* Employees Edit Form Popup */}
      {showEditEmployeeForm && (
        <Popup
          show={showEditEmployeeForm}
          setShow={setShowEditEmployeeForm}
          component={
            <EditAdminForm
              token={token}
              reloadEmployees={reloadEmployee}
              setReloadEmployees={setReloadEmployee}
              editAdmin={editAdmin}
            />
          }
        />
      )}
      {/* Employees Delete Form Popup */}
      {showDeleteEmployeeForm && (
        <Popup
          show={showDeleteEmployeeForm}
          setShow={setShowDeleteEmployeeForm}
          component={
            <DeleteEmployeeAlert
              token={token}
              reloadEmployees={reloadEmployee}
              setReloadEmployees={setReloadEmployee}
              deleteEmployee={deleteEmployee}
            />
          }
        />
      )}
      {/* Employees Assign Form Popup */}
      {showAssignEmployeeForm && (
        <Popup
          show={showAssignEmployeeForm}
          setShow={setShowAssignEmployeeForm}
          component={
            <AssignSkillsForm
              token={token}
              skills={skills}
              loadingSkills={loadingSkills}
              fetchSkills={fetchSkills}
              assignEmployee={assignEmployee}
            />
          }
        />
      )}
    </>
  );
};

export default SingleEmployeeDashboard;
