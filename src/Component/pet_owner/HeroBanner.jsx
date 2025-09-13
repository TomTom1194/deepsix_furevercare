

function HeroBanner({ url, header, slogan, blur = false }) {
    return (
        <section className="position-relative">
            <img
                src={url}
                className="img-fluid w-100"
                alt="Hero Banner"
                style={{ height:"300px", objectFit: "cover" }}
            />
            {blur && (<div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
            ></div>
            )}

            <div className="position-absolute top-50 start-50 translate-middle text-center text-white ">
                <h2 className="display-6 fw-bold">{header}</h2>
                <p className="lead">
                    {slogan}
                </p>
            </div>
        </section>
    );
}

export default HeroBanner;
