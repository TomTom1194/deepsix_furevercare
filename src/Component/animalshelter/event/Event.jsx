import React from "react";

export default function Event() {
  // Dữ liệu slide cho carousel
  const slides = [
    {
      img: "https://www.pasadosafehaven.org/wp-content/uploads/2025/06/pride-vax-clinic.png",
      title: "Pet Vaccination Day",
      desc: "Keep your furry friends safe and healthy",
    },
    {
      img: "https://greatergood.com/cdn/shop/articles/charlestonanimalsocietyvaccinationsfeatured_67f10a4d-fb8d-4145-ad98-257d5124e066.jpg?v=1717643820&width=1100",
      title: "Free Health Check-ups",
      desc: "Comprehensive care for all pets",
    },
    {
      img: "https://i0.wp.com/adltexas.org/wp-content/uploads/2022/12/Website-Event-img_mobile-clinics.png?fit=1350%2C650&ssl=1",
      title: "Community Gathering",
      desc: "Join us for a day of love and care",
    },
  ];

  return (
    <div className="container-fluid p-0">
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

      {/* Event Information */}
      <div className="container my-5">
        <div className="card shadow-sm p-4">
          <h2 className="mb-3">Annual Pet Vaccination Day</h2>
          <p className="mb-0">
            📅 Date: <strong>October 15, 2025</strong> <br />
            📍 Location: <strong>Central Pet Park, District 1</strong> <br />
            🕘 Time: <strong>9:00 AM - 5:00 PM</strong>
          </p>
          <br />
          <p>
            Join us on <strong>October 15, 2025</strong> for our{" "}
            <em>Pet Vaccination Day</em>, a special community event dedicated to
            keeping your beloved pets safe and healthy.
          </p>
          <p>
            Our professional veterinarians will provide{" "}
            <strong>free vaccinations</strong>,{" "}
            <strong>general health check-ups</strong>, and{" "}
            <strong>nutrition consultations</strong> for both dogs and cats.
          </p>
          <p>
            This event is not only about medical care, but also about building a
            loving community of pet owners. Expect fun activities, educational
            talks, and free goodies for your pets.
          </p>
        </div>
      </div>
    </div>
  );
}
