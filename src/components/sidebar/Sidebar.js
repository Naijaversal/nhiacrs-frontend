import React, { useState } from "react";
import "./Sidebar.scss";
import { HiMenu } from "react-icons/hi";
import nhiaLogo from "../../assets/nhia-logo.png";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>

          <img className="image1" src={nhiaLogo} alt="NHIA Logo"
              style={{ cursor: "pointer" }}
              onClick={goHome}/>
          </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenu onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
