import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="container--header-global">
      <div className="container--logo">
        <NavLink className="logo" to="/">
          Hic-héa
        </NavLink>
      </div>
      <div className="container--btn-header">
        <NavLink className="btn-header" to="/">
          Home
        </NavLink>
        <NavLink className="btn-header" to="/login">
          login
        </NavLink>
        <NavLink className="btn-header" to="/register">
          register
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
