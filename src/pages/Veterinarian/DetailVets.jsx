import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import vets from "../../Data/Vet/veterinarian.json";
import caseStudies from "../../Data/Vet/casestudy.json";
import bookings from "../../Data/Vet/booking.json";

function VetDetail() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  const vet = vets.find((v) => v.id === parseInt(currentUser?.id));
  const vetCases = caseStudies.filter((c) => c.name === vet?.name);

  const [activeTab, setActiveTab] = useState("profile");

  // State lọc ngày
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setActiveTab("profile");
  }, []);

  if (!vet) {
    return <p className="text-center mt-5">Veterinarian not found.</p>;
  }

  // Xử lý dữ liệu lịch hẹn
  const today = new Date();
  const appointments = bookings.map((b) => ({
    ...b,
    dateObj: new Date(b.date + "T" + String(b.time).padStart(2, "0") + ":00"),
  }));

  // Lọc theo khoảng ngày
  const filteredAppointments = appointments.filter((a) => {
    if (startDate && a.dateObj < new Date(startDate)) return false;
    if (endDate && a.dateObj > new Date(endDate + "T23:59:59")) return false;
    return true;
  });

  // Sort theo ngày + giờ
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
  }
  return (
    <>
      <div className="mb-3">
        <nav className="navbar navbar-expand-md bg-light">
          <div className="container">
            {/* Logo bên trái */}
            <NavLink className="navbar-brand" to="/">
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{ maxHeight: "60px", width: "auto" }}
              />
            </NavLink>

            {/* Nút user (bên phải trên mobile + desktop) */}
            <div className="d-flex align-items-center order-md-3">
              {currentUser && currentUser.role === "user" && (
                <Link
                  to="/petowner/myprofile"
                  className="btn btn-sm ms-2"
                  style={{ backgroundColor: "#7f5539", color: "white" }}
                >
                  Hi, {currentUser.name}
                </Link>
              )}
              {currentUser && currentUser.role === "vet" && (
                <Link
                  to="/veterinarian/myprofile"
                  className="btn btn-sm ms-2"
                  style={{ backgroundColor: "#7f5539", color: "white" }}
                >
                  Hi, {currentUser.name}
                </Link>
              )}
              <button
                className="btn"
                style={{ backgroundColor: "#7f5539", color: "white" }}
                onClick={handleSignOut}
              >
                Sign out
              </button>

            </div>
          </div>
        </nav>
      </div>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}

        <div
          className="p-3"
          style={{
            width: "250px",
            borderRight: "1px solid #ddd",
            backgroundColor: "#f9f5f2",
          }}
        >
          <h5 className="mb-4" style={{ color: "#7f5539" }}>
            Dashboard
          </h5>
          <ul className="nav flex-column gap-3">
            {["profile", "casestudy", "appointment"].map((tab) => (
              <li key={tab}>
                <button
                  className={`btn w-100 text-start ${activeTab === tab ? "text-white" : "text-dark"
                    }`}
                  style={{
                    backgroundColor:
                      activeTab === tab ? "#7f5539" : "transparent",
                    border:
                      activeTab === tab ? "1px solid #7f5539" : "1px solid #ccc",
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
        <div className="flex-grow-1 p-4">
          {activeTab === "profile" && (
            <div>
              <h3 style={{ color: "#7f5539" }}>{vet.name}</h3>
              <img
                src={vet.image}
                alt={vet.name}
                style={{ width: "200px", borderRadius: "10px" }}
                className="mb-3"
              />
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
          )}

          {activeTab === "casestudy" && (
            <div>
              <h3 style={{ color: "#7f5539" }}>Case Studies by {vet.name}</h3>
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
                      <div className="d-flex gap-2 mt-2">
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
              <h3 style={{ color: "#7f5539" }}>Appointments for {vet.name}</h3>

              {/* Bộ lọc ngày */}
              <div className="d-flex gap-2 align-items-end my-3">
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
        <div
          className="p-4"
          style={{ width: "300px", borderLeft: "1px solid #ddd" }}
        >
          <h5 style={{ color: "#7f5539" }}>How to Use?</h5>
          <p className="text-muted small">
            - View <b>Profile</b> to see veterinarian info. <br />- Go to{" "}
            <b>Case Study</b> to review treatment cases. <br />- Use{" "}
            <b>Appointment</b> to manage bookings. <br />- Filter by{" "}
            <b>Date Range</b> to narrow results. <br />
          </p>
        </div>
      </div>
    </>
  );
}

export default VetDetail;
