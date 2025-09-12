import React, { useEffect, useState } from "react";
import pets from "../../../Data/Petowner/pet.json";
import { Link, useNavigate } from "react-router-dom";

function MyProfile() {
    const [currentUser, setCurrentUser] = useState(null);
    const [myPets, setMyPets] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setCurrentUser(parsedUser);
            const ownedPets = pets.filter((p) => p.owner_id === parsedUser.id);
            setMyPets(ownedPets);
        }
    }, []);


    if (!currentUser) {
        return <div className="container mt-5">No user logged in.</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <h2 className="mb-4">My Profile</h2>
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body text-center">
                            <h5 className="card-title fs-3" style={{ color: "#7f5539" }}>{currentUser.name}</h5>
                            <p className="card-text"><strong>Email:</strong> {currentUser.email}</p>
                            <p className="card-text"><strong>Phone:</strong> {currentUser.phone}</p>
                        </div>
                    </div>


                </div>
                <div className="col-md-9">
                    <h3 className="mb-3">My Pets</h3>
                    {myPets.length > 0 ? (
                        <div className="row">
                            {myPets.map((pet) => (
                                <div className="col-md-4 mb-3" key={pet.id}>
                                    <Link to={`/petowner/pet/${pet.id}`} >
                                        <div className="card cardhover h-100">
                                            <img
                                                src={pet.mainImage}
                                                alt={pet.name}
                                                className="card-img-top"
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{pet.name}</h5>
                                                <p className="card-text"><strong>Species:</strong> {pet.spieces}</p>
                                                <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
                                                <p className="card-text"><strong>Age:</strong> {pet.age} years</p>
                                                <p className="card-text"><strong>Weight:</strong> {pet.weight}</p>
                                                <Link
                                                    to="/veterinarian"
                                                    className="btn btncss w-100"
                                                >
                                                    Booking Vet
                                                </Link>
                                            </div>

                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <p>You don’t have any pets registered.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
