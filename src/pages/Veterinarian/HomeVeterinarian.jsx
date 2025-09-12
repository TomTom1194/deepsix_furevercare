import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import vets from "../../Data/Vet/veterinarian.json";
import AOS from "aos";
import "aos/dist/aos.css";
import "./TitleHomeVets.css";

// Dữ liệu slide cho carousel
const slides = [
  {
    img: "https://www.vets4pets.com/siteassets/species/dog/chocolate-labrador-looking-anxious.jpg",
    title: "Dedicated Pet Care",
    desc: "Our experienced veterinarians are always by your pet’s side.",
  },
  {
    img: "https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg",
    title: "Modern Facilities",
    desc: "Our clinic is equipped with advanced veterinary technology.",
  },
  {
    img: "https://www.thesprucepets.com/thmb/iDUukmHiOhz2Xoo4xMWrW2PpGUU=/3300x0/filters:no_upscale():strip_icc()/white-hotot-rabbit-eating-grass-509265984-5c0da06546e0fb0001366ac0.jpg",
    title: "Peace of Mind for You and Your Pet",
    desc: "We bring health and happiness to your beloved pets.",
  },
];

const HomeVeterinarian = () => {
  const closeNavbar = () => {
    const navbarCollapse = document.getElementById("navbarLinks");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse);
      bsCollapse.hide();
    }
  };
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/veterinarian/${id}`);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [location]);

  return (
    <div>
      {/* Header chung */}
      <nav className="navbar navbar-expand-md bg-light">
        <div className="container">
          {/* Logo bên trái */}
          <NavLink className="navbar-brand" to="/">
            <img
              src="./images/logo.png"
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

            {/* Toggle menu chỉ hiện khi mobile */}
            <button
              className="navbar-toggler ms-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Menu (giữa desktop, dưới mobile) */}
          <div
            className="collapse navbar-collapse justify-content-center order-md-2"
            id="mainNavbar"
          >
            <ul
              className="navbar-nav d-flex justify-content-center text-center text-md-start"
              style={{ fontWeight: "300", gap: "30px", fontSize: "1rem" }}
            >
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
                  to="/animalshelter/animal"
                  onClick={closeNavbar}
                >
                  Animal Shelter
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Carousel */}
      <div
        id="vetCarousel"
        className="carousel slide full-width-carousel"
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
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // nền đen trong suốt
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

        {/* Nút điều hướng */}
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

      {/* Veterinarian Team Section */}
      <div className="container my-5 text-center">
        <h2 className="section-title border rounded p-2 d-inline-block px-5 mt-3">
          Our Veterinarians
        </h2>

        <div className="row justify-content-center mt-4">
          {vets.length === 0 ? (
            <p className="text-muted">
              No veterinarians available at the moment.
            </p>
          ) : (
            vets.map((vet, index) => (
              <div
                key={vet.id}
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                onClick={() => handleClick(vet.id)}
                style={{ cursor: "pointer" }}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} // hiệu ứng xen kẽ
                data-aos-delay={index * 100} // mỗi card trễ 0.1s
              >
                <div className="card vet-card h-100">
                  <img
                    src={vet.image}
                    alt={vet.name}
                    className="card-img-top vet-card-img"
                  />
                  <div className="card-body">
                    <h5 className="card-title vet-card-title">{vet.name}</h5>
                    <p className="card-text vet-specialization">
                      {vet.specialization}
                    </p>
                    <p className="card-text vet-info">
                      <strong>Working Hours:</strong>
                      <br /> {vet.working_time}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeVeterinarian;
