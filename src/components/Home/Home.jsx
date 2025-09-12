import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../../Data/user.json";
import "./Home.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!email) {
      alert("Please fill in all fields before proceeding!");
      return;
    }

    // Tìm user trong JSON
    const existingUser = user.find((u) => u.email === email);

    if (!existingUser) {
      alert("Email does not exist in our system!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    if (existingUser.role === "user") {
      navigate("/petowner");
    } else {
      navigate("/veterinarian")
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div
        className="card shadow-lg p-4 w-100"
        style={{ maxWidth: "400px", borderRadius: "15px" }}
      >
        {/* Logo */}
        <div className="text-center ">
          <img
            src="/images/logo.png"
            alt="FureverCare Logo"
            className="img-fluid "
            style={{ maxWidth: "300px", height: "200px" }}
          />
        </div>

        {/* Input email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Enter your email</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Choices */}
        {/* <div className="mb-3">
          <label className="form-label fw-semibold">You wanna visit</label>
          <div className="d-grid gap-2">
            <button
              type="button"
              className={`btn ${selectedRole === "petowner" ? "btn-dark" : "btn-light"
                } custom-hover`}
              onClick={() => setSelectedRole("petowner")}
            >
              Pet Owner
            </button>

            <button
              type="button"
              className={`btn ${selectedRole === "animalshelter" ? "btn-dark" : "btn-light"
                } custom-hover`}
              onClick={() => setSelectedRole("animalshelter")}
            >
              Animal Shelter
            </button>

            <button
              type="button"
              className={`btn ${selectedRole === "veterinarian" ? "btn-dark" : "btn-light"
                } custom-hover`}
              onClick={() => setSelectedRole("veterinarian")}
            >
              Veterinarian
            </button>
          </div>
        </div>
        {/* Submit */}
        <div className="d-grid">
          <button
            className="btn fw-semibold"
            style={{ backgroundColor: "#7f5539", color: "#fff" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <small className="text-center my-3">Don't have account? <Link to="signup" className="text-brown">Sign Up</Link></small>
      </div>
    </div>
  );
};

export default Home;
