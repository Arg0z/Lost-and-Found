import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>Objective</h1>
      <p>
        The Sheridan Lost and Found aims to revolutionize the process of handling lost and found items within Sheridan College campuses. By establishing an efficient system, the project seeks to achieve several key objectives. Firstly, it aims to enhance the rate of item recovery among students and faculty members by implementing innovative visual displays of found items. Through strategically placed screens and online platforms, individuals will have increased awareness of lost items, thereby facilitating their retrieval process.
      </p>
      <p>
        Secondly, the system aims to alleviate the storage burden currently faced by the Sheridan College Security Team. By streamlining the management process and implementing digital solutions, the system intends to optimize storage space utilization, leading to a more organized and efficient workflow for security personnel.
      </p>
      <p>
        Additionally, the project endeavors to make a positive impact beyond the campus community by potentially generating funds for the student food bank through auctions of unclaimed items. By converting lost items into resources for a charitable cause, the project aligns with Sheridan College's values of community engagement and social responsibility.
      </p>
      <h2>Developers</h2>
      <p>
        This project was developed by a team of dedicated individuals committed to making a difference in the community. The team includes:
      </p>
      <ul>
        <li>Gurbir (Frontend)</li>
        <li>Yehor (Backend)</li>
        <li>Jashman (Backend)</li>
      </ul>
      <h2>Technologies Used</h2>
      <p>
        The project utilizes a React Native frontend with a .NET backend using C#.
      </p>
    </div>
  );
}

export default About;
