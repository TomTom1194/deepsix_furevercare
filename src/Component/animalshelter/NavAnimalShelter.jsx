import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      {/* Logo */}
      <Link className="navbar-brand" to="/animal">
        <img
          src="/images/logo.png"
          alt="logo"
          width="80"
          height="80"
          className="d-inline-block align-top"
        />
      </Link>

      {/* Toggle button (hiện trên mobile) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Nav items */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav w-100 d-flex justify-content-evenly">
          <li className="nav-item">
            <Link className="nav-link" to="/animal">
              Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/story">
              Success Story
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/event">
              Event
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sheltercontact">
              Shelter Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
