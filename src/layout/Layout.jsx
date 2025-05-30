import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="wrapper">
      <Navbar />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
