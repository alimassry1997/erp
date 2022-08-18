import './Admins.css'
import Spinner from "../Layout/Spinner";
 import Admin from "./Admin";
import { AiOutlineTeam } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";

const Admins = ({
  admins,
  token,
  loadingAdmins,
  showEditAdminPopup,
  showAddAdminFormPopup,
  showDeleteAdminPopup,
}) => {
  document.title = "Admins Dashboard | ERP";
  if (loadingAdmins) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard employees-dashboard">
        <div className="header">
          <h2>
            <AiOutlineTeam />
            Admins Management
          </h2>
          <button
            className="btn add-btn"
            onClick={() => showAddAdminFormPopup()}
          >
            <FaPlusSquare />
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-employees">
            <thead>
              <tr>
                <th>Image</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              { admins.map((admin) => (
                <Admin
                  key={admin.id}
                  token={token}
                  image={admin.picture}
                  firstName={admin.first_name}
                  lastName={admin.last_name}
                  email={admin.email}
                  phoneNumber={admin.phone_number}
                  status={admin.status}
                  showEditAdminPopup={showEditAdminPopup}
                  showDeleteAdminPopup={showDeleteAdminPopup}
                  admin={admin}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Admins;