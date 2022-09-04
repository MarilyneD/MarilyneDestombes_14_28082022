import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const VerticalNav = () => {
    return (
        <nav className="vertical-navigation">
        <NavLink className="vertical-navigation-logo" to="/">
          <img
            className="vertical-navigation-logo-image"
            src="/img/wealthhealthlogo.png"
            alt="Wealth Health Logo"
          />
          <h1 className="sr-only">Wealth Health</h1>
        </NavLink>
  
        <div className="vertical-navigation-title">
            <h1>HRnet</h1>
        </div>
        <ul>
        <li className="nav-icon">
          <NavLink to="/employeeslist">
            <img src="/img/employeeslist.svg" alt="employees list icon " />
            <span>View Current Employees</span>
          </NavLink>
        </li>

        <li className="nav-icon">
          <NavLink to="/createemployee">
            <img src="/img/createemployee.svg" alt="create employee icon " />
            <span>Create Employee</span>
          </NavLink>
        </li>
        </ul>






      </nav>
    );
};

export default VerticalNav;