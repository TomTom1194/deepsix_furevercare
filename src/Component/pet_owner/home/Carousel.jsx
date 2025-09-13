function Carousel() {
    return (
        <div id="carouselExampleCaptions" className="carousel slide container" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/2027a2169601075.644fdce4171a6.jpg" className="d-block w-100" alt="image1" style={{ objectFit: "contain" }} />

                </div>
                <div className="carousel-item">
                    <img src="https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1272/cached.offlinehbpl.hbpl.co.uk/news/KMP/Screenshot2023-10-05at09.00.20Cropped.png" className="d-block w-100" alt="image2" style={{  objectFit: "cover" }} />

                </div>
                <div className="carousel-item">
                    <img src="https://img.freepik.com/free-vector/veterinary-clinic-sale-banner-template_23-2149713997.jpg?semt=ais_hybrid&w=740&q=80" className="d-block w-100" alt="image" style={{ objectFit: "cover" }} />

                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;