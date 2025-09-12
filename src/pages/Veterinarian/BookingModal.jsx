import React, { useState, useEffect } from "react";
import booking from "../../Data/Vet/booking.json";
import { useLocation } from "react-router-dom";
import pet from "../../Data/Petowner/pet.json";

function BookingModal() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(2025);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // modal cho vet
  const [recentlyBook, setRecentlyBook] = useState(null);
  const [formData, setFormData] = useState({
    pet_id: "",
    owner: "",
    email: "",
    phone: "",
    reason: "Cleaning",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [userPet, setUserPet] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setFormData((prev) => ({
        ...prev,
        owner: parsedUser.name,
        email: parsedUser.email,
        phone: parsedUser.phone,
      }));
      const myPets = pet.filter((p) => p.owner_id == parsedUser.id);
      setUserPet(myPets);
    }

  }, [location]);
  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8-17
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const days = Array.from({ length: getDaysInMonth(month, year) }, (_, i) => i + 1);

  useEffect(() => {
    setAppointments(booking);
  }, []);

  const isSlotInPast = (day, hour) => {
    const slotDate = new Date(year, month - 1, day, hour);
    return slotDate < new Date();
  };

  const isSlotBooked = (day, hour) =>
    appointments.some((a) => {
      const aDate = new Date(a.date);
      return (
        aDate.getFullYear() === year &&
        aDate.getMonth() + 1 === month &&
        aDate.getDate() === day &&
        a.time === hour
      );
    });

  const getAppointmentDetail = (day, hour) =>
    appointments.find((a) => {
      const aDate = new Date(a.date);
      return (
        aDate.getFullYear() === year &&
        aDate.getMonth() + 1 === month &&
        aDate.getDate() === day &&
        a.time === hour
      );
    });

  const handleSelect = (day, hour) => {
    const booked = isSlotBooked(day, hour);
    const past = isSlotInPast(day, hour);

    if (currentUser?.role === "user") {
      if (past || booked) return;
      setSelectedSlot({ day, hour, month });
      setShowForm(true);
    } else if (currentUser?.role === "vet") {
      if (booked) {
        setSelectedSlot({ day, hour, month });
        setShowDetail(true);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: appointments.length + 1,
      pet_id: formData.pet_id,
      owner: formData.owner,
      email: formData.email,
      phone: formData.phone,
      reason: formData.reason,
      date: `${year}-${month.toString().padStart(2, "0")}-${selectedSlot.day
        .toString()
        .padStart(2, "0")}`,
      time: selectedSlot.hour,
      create_date: todayStr,
    };
    setAppointments((prev) => [...prev, newAppointment]);
    setRecentlyBook({ day: selectedSlot.day, hour: selectedSlot.hour, month });
    setShowForm(false);
    setSelectedSlot(null);
    alert("Booking Successful!");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Vet Appointments</h2>

      {/* Month & Legend */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center mb-2 mb-md-0">
          <button
            className={`btn btn-secondary ${month === 1 ? "disabled" : ""}`}
            onClick={() => month > 1 && setMonth(month - 1)}
          >
            &#8592;
          </button>
          <span className="mx-2">
            {new Date(year, month - 1).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            className={`btn btn-secondary ${month === 12 ? "disabled" : ""}`}
            onClick={() => month < 12 && setMonth(month + 1)}
          >
            &#8594;
          </button>
        </div>

        <div className="d-flex gap-2 flex-wrap px-md-3">
          {[
            { color: "red", text: "Booked" },
            { color: "#FFD700", text: "Booked Today" },
            { color: "#aaaaaaff", text: "Unavailable" },
            { color: "white", text: "Available", border: true },
            { color: "#28a745", text: "Selected" },
            { color: "#7402ffff", text: "Recently Booked" },
          ].map((item, i) => (
            <div className="d-flex align-items-center" key={i}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: item.color,
                  marginRight: 5,
                  border: item.border ? "1px solid #ccc" : "none",
                }}
              ></div>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive" style={{ maxHeight: "70vh", overflowY: "auto", overflowX: "auto" }}>
        <table className="table table-bordered table-hover text-center">
          <thead className="table-light sticky-top">
            <tr>
              <th style={{ position: "sticky", top: 0, left: 0, background: "#fff", zIndex: 3 }}>
                Date / Time
              </th>
              {hours.map((hour) => (
                <th key={hour}>{hour}:00</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <th style={{ position: "sticky", left: 0, background: "#fff", zIndex: 1 }}>
                  {day}
                </th>
                {hours.map((hour) => {
                  const past = isSlotInPast(day, hour);
                  const booked = isSlotBooked(day, hour);
                  const todayBooked = appointments.some(
                    (a) => a.create_date.startsWith(todayStr) && a.time === hour && new Date(a.date).getDate() === day
                  );
                  const selected =
                    selectedSlot?.day === day &&
                    selectedSlot?.hour === hour &&
                    selectedSlot?.month === month;
                  const recently =
                    recentlyBook?.day === day &&
                    recentlyBook?.hour === hour &&
                    recentlyBook?.month === month;

                  return (
                    <td
                      key={hour}
                      onClick={() => handleSelect(day, hour)}
                      style={{
                        cursor: (currentUser?.role === "user" && (past || booked)) || (currentUser?.role === "vet" && !booked) ? "not-allowed" : "pointer",
                        backgroundColor: recently
                          ? "#7402ffff"
                          : booked
                            ? todayBooked
                              ? "#FFD700"
                              : "red"
                            : selected
                              ? "#28a745"
                              : past
                                ? "#d3d3d3ff"
                                : "white",
                        color: past || booked || todayBooked || selected ? "white" : "black",
                        transition: "0.2s",
                        minWidth: "50px",
                        height: "40px",
                      }}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Modal */}
      {showForm && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Information Booking</h5>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Pet ID</label>
                    <select
                      name="pet_id"
                      id="petid"
                      className="form-select"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select pet</option>
                      {userPet.map((p) => (
                        <option key={p.id} value={p.id}>{p.id}: {p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Owner</label>
                    <input
                      type="text"
                      className="form-control"
                      name="owner"
                      value={formData.owner}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <select
                      className="form-select"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                    >
                      <option>Cleaning</option>
                      <option>Checkup</option>
                      <option>Vaccination</option>
                      <option>Surgery</option>
                      <option>Grooming</option>
                    </select>
                  </div>
                  {selectedSlot && (
                    <p>
                      Date : <strong>{selectedSlot.hour}:00, {year}-{month}-{selectedSlot.day}</strong>
                    </p>
                  )}

                  <p>
                    Create Date: <strong>{todayStr}</strong>
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowForm(false);
                      setSelectedSlot(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Vet Modal */}
      {showDetail && selectedSlot && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Appointment Detail</h5>
              </div>
              <div className="modal-body">
                {(() => {
                  const detail = getAppointmentDetail(selectedSlot.day, selectedSlot.hour);
                  if (!detail) return <p>No detail available</p>;
                  return (
                    <>
                      <p>Pet ID: <strong>{detail.pet_id}</strong></p>
                      <p>Owner: <strong>{detail.owner}</strong></p>
                      <p>Email: <strong>{detail.email}</strong></p>
                      <p>Phone: <strong>{detail.phone}</strong></p>
                      <p>Reason: <strong>{detail.reason}</strong></p>
                      <p>Date: <strong>{detail.date} {detail.time}:00</strong></p>
                      <p>Created: <strong>{detail.create_date}</strong></p>
                    </>
                  );
                })()}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDetail(false);
                    setSelectedSlot(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BookingModal;
