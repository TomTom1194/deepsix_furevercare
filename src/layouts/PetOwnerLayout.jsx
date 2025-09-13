import React from "react";
import { Outlet } from "react-router-dom";
import NavPetOwner from "../components/NavPetOwner";
import Footer from "../components/Footer";
import "../index.css"

export default function PetOwnerLayout() {
  return (
    <div>
      <NavPetOwner />
      <div className="container " style={{marginTop:"100px"}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
