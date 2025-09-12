import InforContact from "./InforContact";

function ShelterContact() {
  return (
    <div className="contactus">
      {/* HeroBanner */}
      <section className="position-relative">
        <img
          src="https://smdp.com/wp-content/uploads/sites/21/2024/07/%E2%80%98Kitten-season-begins-at-the-Santa-Monica-Animal-Shelter-1.jpg"
          className="img-fluid w-100"
          alt="Hero Banner"
          style={{ height: "600px", objectFit: "cover" }}
        />

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        ></div>

        <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
          <h2 className="display-6 fw-bold">Contact Us</h2>
          <p className="lead">
            Feel free to reach out to us via email, phone, or visit our shelter.
            We’d love to help you find a forever friend or support your pet’s
            care! 🐾
          </p>
        </div>
      </section>

      {/* InforContact */}
      <InforContact />
    </div>
  );
}

export default ShelterContact;
