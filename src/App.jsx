import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import PetOwnerLayout from "./layouts/PetOwnerLayout";
import AnimalShelterLayout from "./layouts/AnimalShelterLayout";
import VetLayout from "./layouts/VetLayout";

//Start
import Home from "./components/Home/Home";

//Petowner
import HomePetowner from "./pages/PetOwner/home";
import PetCare from "./pages/PetOwner/Petcare";
import PetProduct from "./pages/PetOwner/Petproduct";
import FeedBack from "./pages/PetOwner/Feedback";
import AboutUs from "./pages/PetOwner/aboutus";
import ContactUs from "./pages/PetOwner/contactus";
import EmerPage from "./pages/PetOwner/emerpage";
import PetDetail from "./pages/PetOwner/petdetail";
import ProductDetail from "./pages/PetOwner/productdetail";
import petcare from "../src/Data/Petowner/petcare.json";
import petproduct from "../src/Data/Petowner/petproduct.json";

//Shelter
import Animals from "./Data/Animalshelter/animalshelter.json";
import AnimalShelter from "./Component/animalshelter/gallery/AnimalShelter";
import AnimalDetail from "./Component/animalshelter/gallery/AnimalDetail";
import SuccessStory from "./Component/animalshelter/successstory/SuccessStory";
import StoryDetail from "./Component/animalshelter/successstory/StoryDetail";
import Event from "./Component/animalshelter/event/Event";
import ShelterContact from "./Component/animalshelter/sheltercontact/ShelterContact";

//Vet
import HomeVet from "./pages/Veterinarian/HomeVeterinarian";
import VetProfile from "./pages/Veterinarian/VetProfile";
import MyProfile from "./Component/pet_owner/myprofile/MyProfile";
import MyPetDetail from "./Component/pet_owner/myprofile/MyPetDetail";

import "./index.css";
import "./animalshelter.css";
import SignUp from "./components/SignUp/SignUp";
import HomeVeterinarian from "./pages/Veterinarian/HomeVeterinarian";
import VetDetail from "./pages/Veterinarian/DetailVets";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/*Start*/}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        {/* PetOwner routes */}
        <Route path="/petowner" element={<PetOwnerLayout />}>
          <Route path="" element={<Navigate to="home" replace />} />
          <Route
            path="home"
            element={<HomePetowner pet={petcare} product={petproduct} />}
          />
          <Route path="petcare" element={<PetCare db={petcare} />} />
          <Route path="petproduct" element={<PetProduct db={petproduct} />} />
          <Route path="feedback" element={<FeedBack />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="emergency" element={<EmerPage />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="petcare/:breed" element={<PetDetail db={petcare} />} />
          <Route
            path="petproduct/:id"
            element={<ProductDetail db={petproduct} />}
          />
          <Route path="pet/:id" element={<MyPetDetail />} />
        </Route>

        {/* Veterinarian routes */}
          <Route path="myprofile" element={<VetDetail />} />
        <Route path="/veterinarian" element={<VetLayout />}>
          <Route path="home" element={<HomeVeterinarian />} />
          <Route path=":id" element={<VetProfile />} />
        </Route>

        {/* Animal Shelter routes */}
        <Route path="/animalshelter" element={<AnimalShelterLayout />}>
          <Route path="animal" element={<AnimalShelter />}></Route>
          <Route
            path="animal/:id"
            element={<AnimalDetail animal={Animals} />}
          ></Route>
          <Route path="story" element={<SuccessStory />}></Route>
          <Route path="story/:id" element={<StoryDetail />}></Route>
          <Route path="event" element={<Event />}></Route>
          <Route path="sheltercontact" element={<ShelterContact />}></Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container mt-4">
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
