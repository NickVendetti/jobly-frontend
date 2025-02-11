import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../contexts/UserContext"; 
import "./NavBar.css";

function NavBar() {
  const { currentUser, logout } = useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/companies" className="nav-link">Companies</NavLink>
        <NavLink to="/jobs" className="nav-link">Jobs</NavLink>
      </div>

      <div className="nav-right">
        {currentUser ? (
          <>
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
            <span className="nav-user">Welcome, {currentUser.username}!</span>
            <button className="nav-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/signup" className="nav-link">Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;