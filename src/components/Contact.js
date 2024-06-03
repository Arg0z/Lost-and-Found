import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-phone">Phone: 905-815-4044</p>

      <h2>Campus Safety Offices</h2>
      <div className="campus-offices">
        <p><strong>Davis Campus</strong> – Room: C216</p>
        <p><strong>Hazel McCallion Campus</strong> – Room: B192</p>
        <p><strong>Trafalgar Road Campus</strong> – Room: B100</p>
      </div>

      <h2>Building Hours</h2>
      <div className="building-hours">
        <p><strong>Monday–Friday:</strong> 6 a.m.–11 p.m.</p>
        <p><strong>Saturday & Sunday:</strong> 7 a.m.–5 p.m.</p>
      </div>
    </div>
  );
}

export default Contact;
