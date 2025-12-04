import { useState } from "react";
import "./style/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("Server error. Try again later.");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="glass contact-container">
        <h2>Contact Me</h2>
        <p>
          Email: <a href="mailto:yourname@gmail.com">yourname@gmail.com</a>
        </p>
        <p>
          Phone: <a href="tel:+919876543210">+91 9876543210</a>
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn primary-btn">
            Send Message
          </button>
        </form>

        {status && <p className="status">{status}</p>}
      </div>
    </section>
  );
}

export default Contact;
