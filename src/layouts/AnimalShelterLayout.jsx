import React from "react";
import { Outlet } from "react-router-dom";
import NavAnimalShelter from "../components/NavAnimalShelter";
import Footer from "../components/Footer";
import NavPetowner from "../components/NavPetOwner";

export default function AnimalShelterLayout() {
  return (
    <div>
      <NavPetowner />
      <div className="container " style={{marginTop:"100px"}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
