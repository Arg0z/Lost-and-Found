import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const locations = [
    { name: 'Davis Campus', image: 'https://media-www.sheridancollege.ca/-/media/project/sheridan/shared/images/programs/program-pages/program-index/campus/davis_campus_entrance.png?rev=0aa7dcf56e9548b5a7b16a27ef73dbec&w=1024&hash=EB01BB972427B390D312350D4C71BDDA', link: '/campus/Davis' },
    { name: 'Hazel Mccallion Campus', image: 'https://lh3.googleusercontent.com/p/AF1QipMYJGHBJXKiNcV1jVNecd0Fvkru6lUNcbiA6XRD=s1360-w1360-h1020', link: '/campus/HMC' },
    { name: 'Trafalgar Campus', image: 'https://media-www.sheridancollege.ca/-/media/project/sheridan/shared/images/programs/program-pages/program-index/campus/trafalgar-road-campus-sheridan-college.jpg?rev=21f870310fa244b6aebe48f9b4a5a4c6&w=1024&hash=CC46959813E3F95E06C2FBEBD75F71C3', link: '/campus/Trafalgar' },
  ];

  return (
    <div>
      <h1>LOST AND FOUND</h1>
      <div className="locations-container">
        {locations.map((location, index) => (
          <div className="location" key={index}>
            <Link to={location.link}>
              <img src={location.image} alt={location.name} />
              <div>{location.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
