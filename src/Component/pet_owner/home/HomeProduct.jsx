
import { Link } from "react-router-dom";
import "../../../index.css";

function HomeProduct({ db }) {
    return (
        <div className="container my-4">
            <h2 className="fw-bold my-4">Pet Product</h2>
            <div className="row g-4">
                {db.slice(0, 8).map((product) => (
                    <div key={product.id} className="col col-md-4 col-lg-3">
                        <Link
                            to={`/petowner/petproduct/${product.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div className="card cardhover h-100">
                                <img
                                    src={product.mainImage}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p
                                        className="card-text"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            minHeight: "3rem"
                                        }}
                                    >
                                        {product.description}
                                    </p>

                                    <div className="d-flex align-items-center mb-2 gap-2">
                                        <p className="text-muted mb-0">
                                            Sold: <strong>{product.sale_quantity}</strong>
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <span style={{ color: "#FFD700", marginRight: "5px" }}>⭐</span>
                                            <p className="fw-bold mb-0">{product.rating.toFixed(1)}</p>
                                        </div>
                                    </div>

                                    <h5 className="card-text fw-bold mb-3">${product.price}</h5>
                                    <button className="btn btncss mt-auto">Buy Now</button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {db.length > 8 && (
                <div className="text-center mt-4">
                    <Link to="/petowner/petproduct">
                        <button className="btn btncss-outline px-4 py-2">
                            View More Product
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default HomeProduct;
