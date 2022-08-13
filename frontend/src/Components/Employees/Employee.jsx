import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import IsActiveButton from "./IsActiveButton";

const Employee = ({
  firstName,
  lastName,
  teamName,
  image,
  email,
  status,
  phoneNumber,
}) => {
  return (
    <tr>
      <td>
        <div>
          <img src={image} alt="profile image" />
        </div>
      </td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{teamName}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{<IsActiveButton status={status} />}</td>
      <td>
        <div className="flex-btn">
          <Link to={`/employees/${email}`} className="btn view-btn">
            <BiShowAlt />
          </Link>
          <button
            className="btn edit-btn"
            // onClick={() => showEditClassFormPopup(singleClass)}
          >
            <FaEdit />
          </button>
          <button
            className="btn delete-btn"
            // onClick={() => showDeleteClassFormPopup({ id, name })}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Employee;
