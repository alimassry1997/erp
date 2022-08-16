import { FaEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import IsActiveButton from "./IsActiveButton";

const Employee = ({
  firstName,
  lastName,
  image,
  email,
  status,
  phoneNumber,
  showEditEmployeePopup,
  showDeleteEmployeePopup,
  employee,
}) => {
  const string = "placeholder";
  return (
    <tr>
      <td>
        <div>
          <img
            src={
              image.includes(string)
                ? image
                : `${process.env.REACT_APP_BACKEND_URL}${image}`
            }
            alt="profile image"
          />
        </div>
      </td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>
        {
          <IsActiveButton
            status={status}
            showDeleteEmployeePopup={showDeleteEmployeePopup}
            employee={employee}
          />
        }
      </td>
      <td>
        <div className="flex-btn">
          <Link to={`/employees/${email}`} className="btn view-btn">
            <BiShowAlt />
          </Link>
          <button
            className="btn edit-btn"
            onClick={() => showEditEmployeePopup(employee)}
          >
            <FaEdit />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Employee;
