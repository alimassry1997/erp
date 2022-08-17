import "./SingleTeamEmployees.css";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";

const Employee = ({
  firstName,
  lastName,
  picture,
  email,
  status,
  phoneNumber,
}) => {
  return (
    <div className="single-team-employee-card">
      <div className="single-team-employee-card-image">
        <img src={picture} alt="Employee image" />
      </div>
      <div className="single-team-employee-card-body">
        <h3>
          {firstName} {lastName}
        </h3>
        <p>
          <span>
            <BsFillTelephoneFill /> {phoneNumber}
          </span>
          <span>
            <MdEmail /> {email}
          </span>
        </p>
      </div>
      <div className="single-team-employee-card-footer">
        {status === 1 ? (
          <span className="active-status">Active</span>
        ) : (
          <span className="inactive-status">Inactive</span>
        )}
      </div>
    </div>
  );
};

export default Employee;
