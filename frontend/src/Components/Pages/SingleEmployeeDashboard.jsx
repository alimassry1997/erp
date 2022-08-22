import { useState, useEffect } from "react";
import Popup from "../Layout/Popup";
import { useParams } from "react-router-dom";
import SingleEmployee from "../Employees/SingleEmployee";
import EditEmployeeForm from "../Employees/EditEmployeeForm";
import DeleteEmployeeAlert from "../Employees/DeleteEmployeeAlert";
import EditAdminForm from "../Admins/EditAdminForm";

const SingleEmployeeDashboard = ({
  employee,
  loadingEmployee,
  getEmployee,
  empTeam,
  token,
}) => {
  const { email } = useParams();
  /**
   * Edit Employee Form State Popup
   */
  const [showEditEmployeeForm, setShowEditEmployeeForm] = useState(false);
  const [editAdmin, setEditAdmin] = useState("");

  // /**
  //  * Delete Employee Alert State Popup
  //  */
  const [showDeleteEmployeeForm, setShowDeleteEmployeeForm] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState("");
  //
  /**
   * Refresh Employees Table after each add, edit and delete request
   */
  const [reloadEmployee, setReloadEmployee] = useState(false);

  /**
   * Popup Functions
   */
  const showEditEmployeePopup = (project) => {
    setEditAdmin(project);
    setShowEditEmployeeForm(true);
  };
  //
  const showDeleteEmployeePopup = (project) => {
    setDeleteEmployee(project);
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
      {/*/!* Employees Delete Form Popup *!/*/}
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
    </>
  );
};

export default SingleEmployeeDashboard;
