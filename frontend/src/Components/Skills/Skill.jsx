import CapitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import formatDate from "../../utils/formatDate";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Skill = ({
  name,
  slug,
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
            onClick={() => showEditSkillPopup({ name, slug })}
          >
            <FaEdit />
          </button>

          <button
            className="btn delete-btn"
            onClick={() => showDeleteSkillPopup({ name, slug })}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Skill;
