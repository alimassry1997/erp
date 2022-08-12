import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const DashboardLayout = () => (
  <div>
    <Sidebar />
    <main className="content-container">
      <Outlet />
      <Footer />
    </main>
  </div>
);

export default DashboardLayout;
