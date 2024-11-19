import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo.png';
import { IoMdMenu } from "react-icons/io";

function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom" style={{ height: "100px" }}>
      <div className="container-fluid">
        {/* Sidebar Toggle Button */}
        {/* <button className="btn me-3" onClick={toggleSidebar}>
          <IoMdMenu size={30} />
        </button> */}

        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src={logo}
            alt="Logo"
            className="me-2"
            style={{ width: "80px", height: "80px" }}
          />
          <span className="fw-bold">
            Employee Provident Fund Organisation <br />
            <small className="text-muted">Recovery Admin Module</small>
          </span>
        </a>

        {/* Right-Side Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="flex-grow-1"></div>
          {/* Search Form */}
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
