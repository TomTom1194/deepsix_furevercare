import { useParams } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import pet from "../../../Data/Petowner/pet.json";

function MyPetDetail() {

    const { id } = useParams();
    const data = pet.find((a) => a.id === id);


    const [selectedImage, setSelectedImage] = useState(
        data.images ? data.images[0] : ""
    );

    if (!data) {
        return (
            <div className="">
                <h2 className="">Animal Not Found!</h2>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Pet Detail</h2>
            <div className="row">
                {/* Left column: Images */}
                <div className="col-md-6">
                    <div className="d-none d-md-flex row">
                        <div className="col-2">
                            <div className="d-flex flex-column">
                                {data.images &&
                                    data.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="card mb-2 shadow-sm"
                                            style={{
                                                cursor: "pointer",
                                                border:
                                                    selectedImage === img ? "2px solid #7f5539" : "none",
                                            }}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img
                                                src={img}
                                                alt={`${data.name} ${idx + 1}`}
                                                className="card-img-top"
                                                style={{
                                                    objectFit: "contain",
                                                    aspectRatio: "1 / 1",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* Main image */}
                        <div className="col-10">
                            <div className="card shadow-sm">
                                <img
                                    src={selectedImage}
                                    alt={data.name}
                                    className="card-img-top"
                                    style={{ objectFit: "contain", height: "250px" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile (<768px): Carousel */}
                    <div id="animalCarousel" className="carousel slide d-md-none">
                        <div className="carousel-inner">
                            {data.images.map((img, idx) => (
                                <div
                                    className={`carousel-item ${idx === 0 ? "active" : ""}`}
                                    key={idx}
                                >
                                    <img
                                        src={img}
                                        className="card d-block w-100"
                                        alt={`${data.name} ${idx + 1}`}
                                        style={{ objectFit: "contain", height: "300px" }}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="carousel-indicators">
                            {data.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    data-bs-target="#animalCarousel"
                                    data-bs-slide-to={idx}
                                    className={idx === 0 ? "active" : ""}
                                    aria-current={idx === 0 ? "true" : "false"}
                                    aria-label={`Slide ${idx + 1}`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column: Info */}
                <div className="col-md-6">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h3 className="text-brown">{data.name}</h3>
                            <p>
                                <strong>Species:</strong> {data.spieces}
                            </p>
                            <hr />
                            <p>
                                <strong>Breed:</strong> {data.breed}
                            </p>
                            <hr />
                            <p>
                                <strong>Age:</strong> {data.age} years
                            </p>
                            <hr />
                            <p>
                                <strong>Weight:</strong> {data.weight}
                            </p>
                            <hr />
                            <p>
                                <strong>Vaccine Status:</strong>{" "}
                                {data.vaccine_status}
                            </p>
                            <hr />
                            <p>
                                <strong>Notes:</strong> {data.notes}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Medical History */}
            <div className="mt-5">
                <h3 className="mb-3">Medical History</h3>
                {data.medicalHistory && data.medicalHistory.length > 0 ? (
                    <div className="row">
                        {data.medicalHistory.map((mh, idx) => (
                            <div key={idx} className="col-md-6 mb-3">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">Date: {mh.date}</h5>
                                        <p className="card-text"><strong>Vet:</strong> {mh.vet}</p>
                                        <p className="card-text"><strong>Reason:</strong> {mh.reason}</p>
                                        <p className="card-text"><strong>Diagnosis:</strong> {mh.diagnosis}</p>
                                        <p className="card-text"><strong>Treatment:</strong> {mh.treatment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No medical history available.</p>
                )}
            </div>

            <div className="mt-5">
                <h3 className="mb-3">Upcoming Appointments</h3>
                {data.appointments && data.appointments.length > 0 ? (
                    <div className="row">
                        {data.appointments.map((appt, idx) => (
                            <div key={idx} className="col-md-6 mb-3">
                                <div className="card border-success shadow-sm h-100">
                                    <div className="card-body">
                                        <h5 className="card-title text-success">Date: {appt.date}</h5>
                                        <p className="card-text"><strong>Time:</strong> {appt.time}</p>
                                        <p className="card-text"><strong>Vet:</strong> {appt.vet}</p>
                                        <p className="card-text"><strong>Status:</strong> {appt.status}</p>
                                        <p className="card-text"><strong>Treatment:</strong> {appt.treatment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No upcoming appointments.</p>
                )}
            </div>

        </div>
    );
}

export default MyPetDetail;
