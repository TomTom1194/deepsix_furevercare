import React, { useState } from "react";
import shelters from "../../../Data/Animalshelter/shelterContact.json";

function InforContact() {
  const [selected, setSelected] = useState(shelters[0]);

  const handleChange = (e) => {
    const shelter = shelters.find((s) => s.id === parseInt(e.target.value));
    setSelected(shelter);
  };

  return (
    <section>
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h4 className="card-title fw-bold mb-4" style={{ color: '#7f5539' }}>
                  Shelter Contact Information
                </h4>

                {/* Dropdown */}
                <select
                  className="form-select mb-3"
                  value={selected.id}
                  onChange={handleChange}
                >
                  {shelters.map((shelter) => (
                    <option key={shelter.id} value={shelter.id}>
                      {shelter.name}
                    </option>
                  ))}
                </select>

                <p className="card-text mb-3">
                  <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                  <strong>Address:</strong> {selected.address}
                </p>
                <p className="card-text mb-3">
                  <i className="bi bi-telephone-fill text-primary me-2"></i>
                  <strong>Phone:</strong> {selected.phone}
                </p>
                <p className="card-text mb-3">
                  <i className="bi bi-envelope-fill text-danger me-2"></i>
                  <strong>Email:</strong> {selected.email}
                </p>
                <p className="card-text">
                  <i className="bi bi-clock-fill text-secondary me-2"></i>
                  <strong>Working Hours:</strong> {selected.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body p-0">
                <iframe
                  title="Google Map"
                  src={selected.map}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InforContact;
