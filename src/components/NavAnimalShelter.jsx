import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";

function Header() {
  const closeNavbar = () => {
    const navbarCollapse = document.getElementById("navbarLinks");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse);
      bsCollapse.hide();
    }
  };

  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white ps-lg-5 px-3 shadow-sm fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink
          className="navbar-brand"
          to="/animalshelter/animal"
          onClick={closeNavbar}
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="img-fluid"
            style={{ maxWidth: "80px" }}
          />
        </NavLink>

        {/* Toggle button (hiện trên mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLinks"
          aria-controls="navbarLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav items */}
        <div
          className="collapse navbar-collapse justify-content-center order-3"
          id="navbarLinks"
        >
          <ul
            className="navbar-nav d-flex justify-content-center text-end"
            style={{ fontWeight: "300", gap: "40px", fontSize: "1rem" }}
          >
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to="/animalshelter/animal"
                onClick={closeNavbar}
              >
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to="/animalshelter/story"
                onClick={closeNavbar}
              >
                Success Story
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to="/animalshelter/event"
                onClick={closeNavbar}
              >
                Event
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to="/animalshelter/sheltercontact"
                onClick={closeNavbar}
              >
                Shelter Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to="/petowner/home"
                onClick={closeNavbar}
              >
                Pet Owner
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to="/veterinarian"
                onClick={closeNavbar}
              >
                Veterinarian
              </NavLink>
            </li>

            {currentUser && currentUser.role === "user" && (
              <Link
                to="/petowner/myprofile"
                className="btn"
                style={{ backgroundColor: "#7f5539", color: "white" }}
              >
                Hi, {currentUser.name}
              </Link>
            )}
            {currentUser && currentUser.role === "vet" && (
              <Link
                to="/veterinarian/myprofile"
                className="btn"
                style={{ backgroundColor: "#7f5539", color: "white" }}
              >
                Hi, {currentUser.name}
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
