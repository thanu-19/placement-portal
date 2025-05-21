
import React from "react";
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-info">📍 RGUKT, Andhra Pradesh, India</p>
        <p className="contact-info">📞 +91 98765 43210</p>
        <p className="contact-info">✉️ contact@placementportal.com</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage; // ✅ This ensures proper export
