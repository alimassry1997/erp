import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const DashboardLayout = () => (
  <>
    <Sidebar />
    <Outlet />
    <Footer />
  </>
);

export default DashboardLayout;
