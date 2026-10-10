import React from "react";
import "../assets/contact.css";

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <div className="contact-card card-hard">
        <span className="eyebrow contact-eyebrow">Say Hello</span>
        <h2 className="contact-title">Contact</h2>
        <div className="contact-info">
          <div className="contact-item contact-item-teal">
            <h3>Email</h3>
            <p>
              <a href="mailto:example@example.com">example@example.com</a>
            </p>
          </div>
          <div className="contact-item contact-item-terracotta">
            <h3>Phone</h3>
            <p>
              <a href="tel:+1234567890">+1 234 567 890</a>
            </p>
          </div>
          <div className="contact-item contact-item-mustard">
            <h3>Address</h3>
            <p>123 Main Street, Anytown, USA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
