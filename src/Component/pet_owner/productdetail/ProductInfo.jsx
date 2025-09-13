function ProductInfo({ product }) {
    const handleClick = () => {
    alert("Successful");
    };
    return (
        <div className="container my-4">
            <div
                className="card border-0 rounded-3"
            >
                <div className="card-body">
                    <h3 className="card-title fw-bold text-capitalize mb-3">
                        {product.name}
                    </h3>
                    <div className="d-flex align-items-center mb-3 gap-3">
                        <p className="text-muted mb-0">
                            Sold: <strong>{product.sale_quantity}</strong>
                        </p>
                        <div className="d-flex align-items-center">
                            <span style={{ color: "#FFD700", marginRight: "5px" }}>⭐</span>
                            <p className="fw-bold mb-0">{product.rating.toFixed(1)}</p>
                        </div>
                    </div>
                    <hr className="mb-5" />
                    <h4 className="fw-bold text-success my-3">
                        ${product.price}
                    </h4>
                    <p className="text-muted my-4">
                        Warranty: <strong>18 months</strong>
                    </p>

                    <button className="btn btncss w-50 py-2 fw-bold " onClick={handleClick}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;
