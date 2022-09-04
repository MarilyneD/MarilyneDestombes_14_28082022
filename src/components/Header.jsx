import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const MainNav = () => {
  const globalStoreSign = useSelector(state => state.sign) // rappeler les données du store "sign"
 
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/wealthhealthlogo.png"
          alt="Wealth Health Logo"
        />
        <h1 className="sr-only">Wealth Health</h1>
      </NavLink>

      <div className="title">
          <h1>HRnet</h1>
      </div>
    </nav>
  );
};

export default MainNav;
