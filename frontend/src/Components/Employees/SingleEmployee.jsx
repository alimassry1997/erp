import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import { FaEdit } from "react-icons/fa";
import "./SingleEmployee.css";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { GiSkills } from "react-icons/gi";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

const SingleEmployee = ({
  employee,
  loadingEmployee,
  getEmployee,
  empTeam,
  showEditEmployeePopup,
  showAssignEmployeePopup,
  showDeleteEmployeePopup,
}) => {
  const { email } = useParams();
  useEffect(() => {
    getEmployee(email);
  }, [email]);

  if (loadingEmployee) {
    return <Spinner />;
  } else {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      picture,
      status,
      team: { name },
      system_role_id,
    } = employee;
    return (
      <div className="whole-single-container">
        <div className="profile-image">
          <img src={picture} alt="Single Profile" />
          <div className="btns">
            <button
              className="btn"
              onClick={() => showAssignEmployeePopup(employee)}
            >
              <GiSkills />
            </button>
            <button
              className="btn edit-btn"
              onClick={() => showEditEmployeePopup(employee)}
            >
              <FaEdit />
            </button>

            <button
              className={status === 1 ? "btn delete-btn" : "btn add-btn"}
              onClick={() => showDeleteEmployeePopup(employee)}
            >
              {status === 1 ? <AiFillLock /> : <AiFillUnlock />}
            </button>
          </div>
        </div>
        <div className="prof">
          <div className="block">
            <h2>Personal Information:</h2>
            <div className="the-form">
              <span> Name: </span>
              {first_name} {last_name}
            </div>
            <div className="the-form">
              <span> Email: </span>
              {email}
            </div>
            <div className="the-form">
              <span> Phone: </span>
              {phone_number}
            </div>{" "}
          </div>
          <div>
            <div className="block-2">
              <h2>Work Description:</h2>
              <div className="the-form">
                <span> Team Name: </span>
                {capitalizeFirstLetter(name)}
              </div>
              <div className="the-form">
                <span> Post: </span>
                {system_role_id === 2 ? "Employee" : "Admin"}
              </div>
              <div className="the-form">
                <span> Team Size: </span>
                {empTeam}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleEmployee;
