import { useState, useEffect } from "react";
import Teams from "../Teams/Teams";
import Popup from "../Layout/Popup";
import AddTeamForm from "../Teams/AddTeamForm";
import axios from "axios";

const TeamsDashboard = ({ teams, loadingTeams, fetchTeams, token }) => {
  /**
   * Add Team Form State Popup
   */
  const [showAddTeamForm, setShowAddTeamForm] = useState(false);

  /**
   * Edit Team Form State Popup
   */
  const [showEditTeamForm, setShowEditTeamForm] = useState(false);

  /**
   * Refresh Teams Table after each add, edit and delete request
   */
  const [reloadTeams, setReloadTeams] = useState(false);

  /**
   * Unassigned Employees State
   */
  const [unassignedEmployees, setUnassignedEmployees] = useState([]);
  const [loadingUnassignedEmployees, setLoadingUnassignedEmployees] =
    useState(true);

  /**
   * Get All unassigned employees
   * @returns {Promise<void>}
   */
  const getUnassignedEmployees = async () => {
    try {
      setLoadingUnassignedEmployees(true);
      const response = await axios.get(`/api/teams/filter/unassigned`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const {
        data: { employees },
      } = response;
      setUnassignedEmployees(employees);
      setLoadingUnassignedEmployees(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const showAddTeamFormPopup = () => {
    setShowAddTeamForm(true);
  };
  useEffect(() => {
    fetchTeams();
  }, [reloadTeams]);

  return (
    <>
      <Teams
        teams={teams}
        loadingTeams={loadingTeams}
        showAddTeamFormPopup={showAddTeamFormPopup}
      />
      {/* Teams Add Form Popup */}
      {showAddTeamForm && (
        <Popup
          show={showAddTeamForm}
          setShow={setShowAddTeamForm}
          component={
            <AddTeamForm
              token={token}
              reloadTeams={reloadTeams}
              setReloadTeams={setReloadTeams}
              getUnassignedEmployees={getUnassignedEmployees}
              loadingUnassignedEmployees={loadingUnassignedEmployees}
              unassignedEmployees={unassignedEmployees}
            />
          }
        />
      )}
    </>
  );
};

export default TeamsDashboard;
