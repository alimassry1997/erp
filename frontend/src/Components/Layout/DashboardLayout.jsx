import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [auth]);
  return (
    <div>
      <Sidebar setAuth={setAuth} />
      <main className="content-container">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
