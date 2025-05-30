import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Header from "./header/Header";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="wrapper">
      <Navbar />

      <main className="main">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
