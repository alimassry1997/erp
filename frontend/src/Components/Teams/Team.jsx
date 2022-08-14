import { FaEdit, FaTrashAlt } from "react-icons/fa";
import formatDate from "../../utils/formatDate";
import { BiShowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import CapitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const Team = ({ name, size, created_at, updated_at, slug }) => {
  return (
    <tr>
      <td>{CapitalizeFirstLetter(name)}</td>
      <td>{size}</td>
      <td>{formatDate(created_at)}</td>
      <td>{formatDate(updated_at)}</td>
      <td>
        <div className="flex-btn">
          <Link to={`/teams/${slug}`} className="btn view-btn">
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

export default Team;
