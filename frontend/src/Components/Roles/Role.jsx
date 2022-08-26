import CapitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import formatDate from "../../utils/formatDate";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Role = ({
  name,
  slug,
  showDeleteRolePopup,
  showEditRolePopup,
}) => {
  return (
    <tr>
      <td>{CapitalizeFirstLetter(name)}</td>
      <td>
        <div className="flex-btn">
          <button
            className="btn edit-btn"
            onClick={() => showEditRolePopup({ name, slug })}
          >
            <FaEdit />
          </button>

          <button
            className="btn delete-btn"
            onClick={() => showDeleteRolePopup({ name, slug })}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Role;
