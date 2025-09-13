import React from "react";
import { Outlet } from "react-router-dom";
import NavVeterinarian from "../components/NavVeterinarian";
import Footer from "../components/Footer";
import NavPetowner from "../components/NavPetOwner";

export default function VetLayout() {
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
