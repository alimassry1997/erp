import CapitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import formatDate from "../../utils/formatDate";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Skill = ({
  name,
  created_at,
  updated_at,
  showDeleteSkillPopup,
  showEditSkillPopup,
}) => {
  return (
    <tr>
      <td>{CapitalizeFirstLetter(name)}</td>
      <td>{formatDate(created_at)}</td>
      <td>{formatDate(updated_at)}</td>
      <td>
        <div className="flex-btn">
          <button
            className="btn edit-btn"
            onClick={() => showEditSkillPopup({ name })}
          >
            <FaEdit />
          </button>

          <button
            className="delete-btn"
            onClick={() => showDeleteSkillPopup({ name })}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Skill;
