import { useParams } from "react-router-dom";
import petproduct from "../../../Data/Petowner/petproduct.json";
import React, { useState } from 'react';

export default function ImageProduct() {
    const { id } = useParams();
    const data = petproduct.find((a) => a.id === parseInt(id, 10));


    const [selectedImage, setSelectedImage] = useState(
        data.images ? data.images[0] : ""
    );

    if (!data) {
        return (
            <div className="">
                <h2 className="">Product Not Found!</h2>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row">

                {/* Desktop */}
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
        </div>
    )
};