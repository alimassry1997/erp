import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import { FaEdit } from "react-icons/fa";
import "./SingleEmployee.css";

const SingleEmployee = ({ employee, loadingEmployee, getEmployee }) => {
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
      picture
    } = employee;
    return (
      <div className="single-team-container">
        <div className="content">
          <div className="profile">
            <img src={picture} alt="profile" />
          </div>
          <div className="profile-head">
            <div className="buttons">
              <button
                className="btn edit-btn"
                // onClick={() =>
                //   showEditEmployeePopup({
                //     first_name,
                //     last_name,
                //     phone_number,
                //     email,
                //     picture,
                //   })
                // }
              >
                <FaEdit />
              </button>
              <button className="btn add-btn">Active</button>
            </div>
            <div className="profile-content">
              <h4>
                <span>Credentials:</span>
              </h4>
              <h4>
                Name: {first_name} {last_name}
              </h4>
              <h4>Phone: {phone_number}</h4>
              <h4>Email: {email}</h4>
              <h4>
                <span>Details:</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleEmployee;
