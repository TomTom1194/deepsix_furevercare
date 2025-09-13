import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import vets from "../../Data/Vet/veterinarian.json";
import caseStudies from "../../Data/Vet/casestudy.json";
import bookings from "../../Data/Vet/booking.json";
import Footer from "../../components/Footer"

function VetDetail() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setActiveTab("profile");
  }, []);

  const vet = vets.find((v) => v.id === parseInt(currentUser?.id));
  const vetCases = caseStudies.filter((c) => c.name === vet?.name);

  if (!vet) {
    return <p className="text-center mt-5">Veterinarian not found.</p>;
  }

  // xử lý dữ liệu lịch hẹn
  const today = new Date();
  const appointments = bookings.map((b) => ({
    ...b,
    dateObj: new Date(b.date + "T" + String(b.time).padStart(2, "0") + ":00"),
  }));

  const filteredAppointments = appointments.filter((a) => {
    if (startDate && a.dateObj < new Date(startDate)) return false;
    if (endDate && a.dateObj > new Date(endDate + "T23:59:59")) return false;
    return true;
  });

  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => a.dateObj - b.dateObj
  );

  const upcoming = sortedAppointments.filter((a) => a.dateObj >= today);
  const history = sortedAppointments.filter((a) => a.dateObj < today);

  const renderAppointments = (list) =>
    list.length === 0 ? (
      <p className="text-muted">No appointments.</p>
    ) : (
      <div className="table-responsive">
        <table className="table table-bordered table-sm align-middle text-center">
          <thead style={{ backgroundColor: "#7f5539", color: "white" }}>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Pet ID</th>
              <th>Owner</th>
              <th>Reason</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.date}</td>
                <td>{a.time}:00</td>
                <td>
                  <Link to={`/petowner/pet/${a.pet_id}`}>{a.pet_id}</Link>
                </td>
                <td>{a.owner}</td>
                <td>{a.reason}</td>
                <td>
                  <div>{a.email}</div>
                  <div>{a.phone}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <div className="">
        <nav className="navbar navbar-expand-md bg-white shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{ maxHeight: "60px", width: "auto" }}
              />
            </NavLink>
            <div className="d-flex align-items-center order-md-3">
              {currentUser && currentUser.role === "vet" && (
                <Link to="/myprofile" className="btn-custom me-1">
                  Hi, {currentUser.name}
                </Link>
              )}
              <button
                className="btn btn-outline-secondary"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Dashboard Button for Mobile/Tablet */}
      <div className="d-lg-none ms-3 mb-3 ">
        <button
          className="btn btn-outline-secondary text-dark"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDashboard"
        >
          ☰ Dashboard
        </button>
      </div>

      {/* Offcanvas Sidebar */}
      {/* <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasDashboard"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" style={{ color: "#7f5539" }}>
            Dashboard
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column gap-3">
            {["profile", "casestudy", "appointment"].map((tab) => (
              <li key={tab}>
                <button
                  className={`btn w-100 text-start ${
                    activeTab === tab ? "text-white" : "text-dark"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === tab ? "#7f5539" : "transparent",
                    border:
                      activeTab === tab
                        ? "1px solid #7f5539"
                        : "1px solid #ccc",
                  }}
                  data-bs-dismiss="offcanvas"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "profile"
                    ? "Profile Veterinarian"
                    : tab === "casestudy"
                    ? "Case Study"
                    : "Appointment"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

     
      <div className="container-fluid" >
        <div className="row">
          
          <div
            className="col-lg-2 p-3 border-end d-none d-lg-block"
            style={{ backgroundColor: "#f9f5f2" }}
          >
            <h5 className="mb-4" style={{ color: "#7f5539" }}>
              Dashboard
            </h5>
            <ul className="nav flex-column gap-3">
              {["profile", "casestudy", "appointment"].map((tab) => (
                <li key={tab}>
                  <button
                    className={`btn w-100 text-start ${
                      activeTab === tab ? "text-white" : "text-dark"
                    }`}
                    style={{
                      backgroundColor:
                        activeTab === tab ? "#7f5539" : "transparent",
                      border:
                        activeTab === tab
                          ? "1px solid #7f5539"
                          : "1px solid #ccc",
                    }}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "profile"
                      ? "Profile Veterinarian"
                      : tab === "casestudy"
                      ? "Case Study"
                      : "Appointment"}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-12 col-lg-7 p-4">
            {activeTab === "profile" && (
              <div className=" d-flex flex-wrap gap-3" style={{justifyContent:"center"}}>
                <img
                  src={vet.image}
                  alt={vet.name}
                  style={{ width:"fit-content", borderRadius: "10px", maxHeight:"400px", objectFit:"contain" }}
                  className="mb-3 img-fluid rounded"
                />
                <div className="text-start">

                <h3 style={{ color: "#7f5539" }}>{vet.name}</h3>
                <p>
                  <strong>Specialization:</strong> {vet.specialization}
                </p>
                <p>
                  <strong>Email:</strong> {vet.email}
                </p>
                <p>
                  <strong>Phone:</strong> {vet.phone}
                </p>
                <p>
                  <strong>Working Time:</strong> {vet.working_time}
                </p>
                </div>
              </div>
            )}

            {activeTab === "casestudy" && (
              <div>
                <h3 style={{ color: "#7f5539" }}>
                  Case Studies by {vet.name}
                </h3>
                {vetCases.length === 0 ? (
                  <p className="text-muted">No case studies available.</p>
                ) : (
                  vetCases.map((c) => (
                    <div key={c.id} className="card mb-3 border-1">
                      <div className="card-body">
                        <h5 style={{ color: "#7f5539" }}>{c.title}</h5>
                        <p>{c.content1}</p>
                        <p>{c.content2}</p>
                        <small className="text-muted">
                          {c.date} - {c.name}
                        </small>
                        <div className="d-flex gap-2 mt-2 flex-wrap justify-content-center">
                          <img
                            src={c.image1}
                            alt=""
                            style={{ width: "120px", borderRadius: "8px" }}
                          />
                          <img
                            src={c.image2}
                            alt=""
                            style={{ width: "120px", borderRadius: "8px" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "appointment" && (
              <div>
                <h3 style={{ color: "#7f5539" }}>
                  Appointments for {vet.name}
                </h3>
                <div className="d-flex flex-wrap gap-2 align-items-end my-3">
                  <div>
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control border-1"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      style={{ borderColor: "#7f5539" }}
                    />
                  </div>
                  <div>
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control border-1"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      style={{ borderColor: "#7f5539" }}
                    />
                  </div>
                </div>

                <h5 style={{ color: "#7f5539" }} className="mt-4">
                  Upcoming
                </h5>
                {renderAppointments(upcoming)}

                <h5 style={{ color: "#7f5539" }} className="mt-4">
                  History
                </h5>
                {renderAppointments(history)}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="col-12 col-lg-3 p-4 border-start text-center">
            <h5 style={{ color: "#7f5539" }}>How to Use?</h5>
            <p className="text-muted small">
              - View <b>Profile</b> to see veterinarian info. <br />- Go to{" "}
              <b>Case Study</b> to review treatment cases. <br />- Use{" "}
              <b>Appointment</b> to manage bookings. <br />- Filter by{" "}
              <b>Date Range</b> to narrow results. <br />
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default VetDetail;
