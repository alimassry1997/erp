import { useState, useEffect } from "react";
// import Popup from "../Layout/Popup";
// import axios from "axios";
import { useParams } from "react-router-dom";
import SingleEmployee from "../Employees/SingleEmployee";

const SingleEmployeeDashboard = ({
  employee,
  loadingEmployee,
  getEmployee,
  // token,
}) => {
  const { email } = useParams();
  /**
   * Edit Employee Form State Popup
   */
  // const [showEditEmployeeForm, setShowEditEmployeeForm] = useState(false);
  // const [editEmployee, setEditEmployee] = useState("");
  //
  // /**
  //  * Delete Employee Alert State Popup
  //  */
  // const [showDeleteEmployeeForm, setShowDeleteEmployeeForm] = useState(false);
  // const [deleteEmployee, setDeleteEmployee] = useState("");
  //
  /**
   * Refresh Employees Table after each add, edit and delete request
   */
  const [reloadEmployee, setReloadEmployee] = useState(false);

  /**
   * Popup Functions
   */
  // const showEditEmployeePopup = (project) => {
  //   setEditEmployee(project);
  //   setShowEditEmployeeForm(true);
  // };
  //
  // const showDeleteEmployeePopup = (project) => {
  //   setDeleteEmployee(project);
  //   setShowDeleteEmployeeForm(true);
  // };

  useEffect(() => {
    getEmployee(email);
  }, [reloadEmployee]);

  return (
    <>
      <SingleEmployee
        employee={employee}
        loadingEmployee={loadingEmployee}
        getEmployee={getEmployee}
        // showEditEmployeePopup={showEditEmployeePopup}
        // showDeleteEmployeePopup={showDeleteEmployeePopup}
      />
      {/* Employees Edit Form Popup */}
      {/*{showEditEmployeeForm && (*/}
      {/*    <Popup*/}
      {/*        show={showEditEmployeeForm}*/}
      {/*        setShow={setShowEditEmployeeForm}*/}
      {/*        component={*/}
      {/*            <EditEmployeeForm*/}
      {/*                token={token}*/}
      {/*                reloadEmployees={reloadEmployee}*/}
      {/*                setReloadEmployees={setReloadEmployee}*/}
      {/*                getEmployees={getEmployees}*/}
      {/*                loadingEmployees={loadingEmployees}*/}
      {/*                setLoadingEmployees={setLoadingEmployees}*/}
      {/*                employeesList={employeesList}*/}
      {/*                setEmployeesList={setEmployeesList}*/}
      {/*                editEmployee={editEmployee}*/}
      {/*            />*/}
      {/*        }*/}
      {/*    />*/}
      {/*)}*/}
      {/*/!* Employees Delete Form Popup *!/*/}
      {/*{showDeleteEmployeeForm && (*/}
      {/*    <Popup*/}
      {/*        show={showDeleteEmployeeForm}*/}
      {/*        setShow={setShowDeleteEmployeeForm}*/}
      {/*        component={*/}
      {/*            <DeleteEmployeeAlert*/}
      {/*                token={token}*/}
      {/*                reloadEmployees={reloadEmployee}*/}
      {/*                setReloadEmployees={setReloadEmployee}*/}
      {/*                deleteEmployee={deleteEmployee}*/}
      {/*            />*/}
      {/*        }*/}
      {/*    />*/}
      {/*)}*/}
    </>
  );
};

export default SingleEmployeeDashboard;
