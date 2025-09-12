import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import "aos/dist/aos.css";

import Animals from "../../../Data/Animalshelter/animalshelter.json";

export default function AnimalShelter() {
  const slides = [
    {
      img: "https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/b2778d5b-3f8d-4eca-975e-a61767429949/GettyImages-2001188598.jpg",
      title: "Compassionate Rescue",
      desc: "We give every stray a safe and caring home.",
    },
    {
      img: "https://www.grantwatch.com/grantnews/wp-content/uploads/2024/11/PetArticle800x445-1.jpg",
      title: "Safe Shelter",
      desc: "Clean and comfortable spaces for rescued animals.",
    },
    {
      img: "https://www.theleader.com.au/images/transform/v1/crop/frm/m9vLL79wG9rkYqcLgNT6gJ/e856b2cb-df43-45c4-b9c9-fd10e1d1963e.jpg/r0_453_4431_2954_w1200_h678_fmax.jpg",
      title: "Hope and Care",
      desc: "Bringing love and a second chance to every pet.",
    },
  ];

  const location = [
    {
      "id": 1,
      "name": "-- Select Location --"
    },
    {
      "id": 2,
      "name": "Ho Chi Minh City"
    },
    {
      "id": 3,
      "name": "Ha Noi City"
    },
    {
      "id": 4,
      "name": "Da Nang City"
    },
    {
      "id": 5,
      "name": "Nha Trang City"
    },
  ]

  // Function Filter
  const [filters, setFilters] = useState({
    type: "",
    breed: "",
    age: "",
    location: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredAnimals = useMemo(() => {
    return Animals.filter((animal) => {
      return (
        animal.type.toLowerCase().includes(filters.type.toLowerCase()) &&
        animal.breed.toLowerCase().includes(filters.breed.toLowerCase()) &&
        (filters.age === "" || animal.age === Number(filters.age)) &&
        (filters.location === "" || animal.location === filters.location)
      );
    });
  }, [filters]);

  // Viewmore Button
  const [visibleCount, setVisibleCount] = useState(8);

  return (
    <div className="container ">
      {/* Carousel */}
      <div
        id="vetCarousel"
        className="carousel slide full-width-carousel mb-4"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="d-block w-100"
                style={{ height: "75vh", objectFit: "cover" }}
              />
              <div className="carousel-caption custom-caption-bottom">
                <div
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "15px 25px",
                    borderRadius: "10px",
                    display: "inline-block",
                  }}
                >
                  <h2 data-aos="fade-up">{slide.title}</h2>
                  <p data-aos="fade-up" data-aos-delay="200">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          className="carousel-control-prev custom-carousel-btn"
          type="button"
          data-bs-target="#vetCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next custom-carousel-btn"
          type="button"
          data-bs-target="#vetCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>

      {/* Filter Function */}
      <div className="card p-3 mb-4">
        <h5 className="mb-3">Filter Animals</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              name="type"
              placeholder="Filter by Type"
              className="form-control"
              value={filters.type}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="breed"
              placeholder="Breed"
              className="form-control"
              value={filters.breed}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="form-control"
              value={filters.age}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <select
              name="location"
              className="form-select"
              value={filters.location}
              onChange={handleFilterChange}
            >
              {location.map((loc) => (
                <option key={loc.id} value={loc.id === 1 ? "" : loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Animal Card */}
      <div className="row">
        {filteredAnimals.length > 0 ? (
          filteredAnimals.slice(0, visibleCount).map((animal) => (
            <div
              key={animal.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
            >
              <Link
                to={`/animalshelter/animal/${animal.id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card custom-card-hover h-100">
                  <img
                    src={animal.images[0]}
                    alt={animal.name}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{animal.name}</h5>
                    <p className="card-text">
                      <strong>Age:</strong> {animal.age} <br />
                      <strong>Breed:</strong> {animal.breed} <br />
                      <small className="text-truncate-3 d-block mt-3">
                        {animal.description}
                      </small>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">No animals match your filters.</p>
        )}

        {/* View more button */}
        {visibleCount < filteredAnimals.length && (
          <div className="d-flex justify-content-center my-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="btn-outline-secondary px-4 py-2 fw-semibold"
            >
              View more {filteredAnimals.length - visibleCount} Animals ↓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
