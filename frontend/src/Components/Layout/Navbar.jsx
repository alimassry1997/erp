import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ auth: { user }, setAuth }) => {
  const navigate = useNavigate();
  const { first_name, picture } = user;
  const onLogout = () => {
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/login");
  };
  return (
    <nav>
      <div>
        <Link to="/">
          <img src={picture} alt="profile image" />
          <p>{first_name}</p>
        </Link>
      </div>
      <button onClick={onLogout}>
        <FiLogOut /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
