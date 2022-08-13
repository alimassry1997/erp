import { FaEdit, FaTrashAlt } from "react-icons/fa";
import formatDate from "../../utils/formatDate";
import { BiShowAlt } from "react-icons/bi";

const Team = ({ name, size, created_at, updated_at }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{size}</td>
      <td>{formatDate(created_at)}</td>
      <td>{formatDate(updated_at)}</td>
      <td>
        <div className="flex-btn">
          <button
            className="btn view-btn"
            // onClick={() => showEditClassFormPopup(singleClass)}
          >
            <BiShowAlt />
          </button>
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

export default Team;
