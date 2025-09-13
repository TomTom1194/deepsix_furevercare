import React from "react";

function InforContact() {
    return (
        <div className="container py-5">

            <div className="row g-4">
                <div className="col-lg-5">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                            <h4 className="card-title fw-bold  mb-4" style={{ color: "#7f5539" }}>Team Contact Information</h4>
                            <p className="card-text mb-3">
                                <i className="bi bi-envelope-fill  me-2" ></i>
                                <strong>Email:</strong> contact@furevercare.com
                            </p>
                            <p className="card-text mb-3">
                                <i className="bi bi-telephone-fill  me-2"></i>
                                <strong>Phone:</strong> +1 (123) 456-7890
                            </p>
                            <p className="card-text mb-3">
                                <i className="bi bi-geo-alt-fill  me-2"></i>
                                <strong>Address:</strong> 21bis Hau Giang, Tan Binh, Ho Chi Minh, VietNam
                            </p>
                            <p className="card-text mb-3">
                                <i className="bi bi-globe2  me-2"></i>
                                <strong>Website:</strong> www.furevercare.com
                            </p>
                            <p className="card-text">
                                <i className="bi bi-clock-fill  me-2"></i>
                                <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body p-0">
                            <iframe
                                title="Google Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0466913070227!2d106.66085841023961!3d10.80773595857173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293ca6cabe9b%3A0xfe7e5f0c4d1672c3!2zMjFCaXMgSOG6rXUgR2lhbmcsIFBoxrDhu51uZyA0LCBUw6JuIELDrG5oLCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1757488921581!5m2!1sen!2s"
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforContact;
