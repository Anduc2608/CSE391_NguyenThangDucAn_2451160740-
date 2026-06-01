import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title text-center">Get In Touch</h2>
        <div className="contact-card">
          <p className="text-center text-muted">Feel free to reach out!</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;