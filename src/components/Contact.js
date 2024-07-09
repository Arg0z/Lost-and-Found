import React from 'react';
import './Contact.css';

function Contact() {
  const davisMap = `
    <gmp-map center="43.6553,-79.7396" zoom="14" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="43.6553,-79.7396" title="Davis Campus"></gmp-advanced-marker>
    </gmp-map>
  `;
  const hazelMap = `
    <gmp-map center="43.5934,-79.6474" zoom="14" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="43.5934,-79.6474" title="Hazel McCallion Campus"></gmp-advanced-marker>
    </gmp-map>
  `;
  const trafalgarMap = `
    <gmp-map center="43.4697,-79.7005" zoom="14" map-id="DEMO_MAP_ID">
      <gmp-advanced-marker position="43.4697,-79.7005" title="Trafalgar Road Campus"></gmp-advanced-marker>
    </gmp-map>
  `;

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-phone">Phone: 905-815-4044</p>

      <h2>Campus Safety Offices</h2>
      <div className="campus-offices">
        <div className="campus-office">
          <p><strong>Davis Campus</strong> – Room: C216</p>
          <div dangerouslySetInnerHTML={{ __html: davisMap }} />
        </div>
        <div className="campus-office">
          <p><strong>Hazel McCallion Campus</strong> – Room: B192</p>
          <div dangerouslySetInnerHTML={{ __html: hazelMap }} />
        </div>
        <div className="campus-office">
          <p><strong>Trafalgar Road Campus</strong> – Room: B100</p>
          <div dangerouslySetInnerHTML={{ __html: trafalgarMap }} />
        </div>
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
