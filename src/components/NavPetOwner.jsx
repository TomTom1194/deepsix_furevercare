import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function NavPetowner() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, [location]);
    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
    }

    const isActive = (path) => (location.pathname.startsWith(path) ? "active" : "");

    return (
        <div className="header fixed-top bg-white">
            <nav className=" navbar navbar-expand-lg navbar-light shadow-sm">

                <div className="container">
                    <div className="img-fluid me-auto order-0">

                        <Link to="/petowner/home">
                                <img src="/images/logo.png" alt="Logo" style={{ width: "70px" }} />
                        </Link>
                    </div>
                        <div className="d-flex me-2 order-1 order-lg-2" style={{alignItems:"center"}}>

                        {currentUser && currentUser.role === "user" && (
                            <Link
                            to="/petowner/myprofile"
                            className="btn-custom me-1"
                            >
                                Hi, {currentUser.name}
                            </Link>
                        )}
                        <button
                            className="btn btn-outline-secondary"
                            
                            onClick={handleSignOut}
                            >
                            Sign out
                        </button>
                    </div>

                    <button
                        className="navbar-toggler order-2 order-lg-1"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-controls="navbarSupportedContent"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={`collapse navbar-collapse ${isOpen ? "show" : ""} order-3 order-lg-1`}
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav  mb-2 mb-lg-0 gap-2 align-items-center">
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/petowner/home")}`} to="/petowner/home">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/petowner/petcare")}`} to="/petowner/petcare">
                                    Pet Care
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/petowner/petproduct")}`} to="/petowner/petproduct">
                                    Pet Product
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/petowner/aboutus")}`} to="/petowner/aboutus">
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/petowner/contactus")}`} to="/petowner/contactus">
                                    Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/petowner/feedback")}`} to="/petowner/feedback">
                                    Feedback
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/petowner/emergency")}`} to="/petowner/emergency">
                                    Emergency
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive("/veterinarian")}`} to="/veterinarian/home">
                                    Veterinarian
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                            <Link
                                className={`nav-link   ${isActive("/animalshelter")}`}
                                to="#"
                                id="animalShelterDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Animal Shelter
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="animalShelterDropdown">
                                <li>
                                <Link className="dropdown-item" to="/animalshelter/animal">
                                    Gallery
                                </Link>
                                </li>
                                <li>
                                <Link className="dropdown-item" to="/animalshelter/story">
                                    Success Story
                                </Link>
                                </li>
                                <li>
                                <Link className="dropdown-item" to="/animalshelter/event">
                                    Event
                                </Link>
                                </li>
                                <li>
                                <Link className="dropdown-item" to="/animalshelter/sheltercontact">
                                    Shelter Contact
                                </Link>
                                </li>
                            </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavPetowner;
