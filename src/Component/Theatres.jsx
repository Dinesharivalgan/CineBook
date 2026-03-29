
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { movies } from './MovieList';
import './Theatres.css';

const theatreList = [
  "PVR Cinemas", "INOX", "Sathyam Cinemas", "Escape Cinemas", "AGS Cinemas",
  "SPI Cinemas", "City Theatre", "Kishore Cinema", "Mayajaal", "Luxe Cinemas"
];

const showSlots = [
  { label: "Morning Show", time: "11:15 AM - 2:00 PM" },
  { label: "Afternoon Show", time: "12:30 PM - 3:00 PM" },
  { label: "Evening Show", time: "3:30 PM - 6:30 PM" },
  { label: "Night Show", time: "7:00 PM - 10:00 PM" }
];

function Theatres() {
  const navigate = useNavigate();
  const [theatreMovies, setTheatreMovies] = useState([]);

  const handleTheatreClick = (theatre) => {
    // Randomly select 3-7 movies
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 5) + 3; // 3 to 7 movies
    const selected = shuffled.slice(0, count);

    // Assign random show slot to each movie
    const assigned = selected.map(movie => {
      const slot = showSlots[Math.floor(Math.random() * showSlots.length)];
      return { ...movie, show: slot };
    });

    setTheatreMovies(assigned);
  };

  return (
    <div className="theatre-container">
      <h1>Theatres</h1>
      <div className="theatre-list">
        {theatreList.map((theatre, index) => (
          <div 
            key={index} 
            className="theatre-card"
            onClick={() => handleTheatreClick(theatre)}
          >
            {theatre}
          </div>
        ))}
      </div>

      {theatreMovies.length > 0 && (
        <div className="movie-grid">
          <h2>Now Showing</h2>
          <div className="movies">
            {theatreMovies.map((movie, index) => (
              <div
                key={index}
                className="card"
                onClick={() => navigate(`/movie/${movies.findIndex(m => m.title === movie.title)}`)}
              >
                <div className="card-img-wrapper">
                  <img src={movie.img} alt={movie.title} />
                  <div className="overlay">
                    <button
                      className="book-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movie/${movies.findIndex(m => m.title === movie.title)}`);
                      }}
                    >
                      🎟 Book Now
                    </button>
                  </div>
                </div>
                <div className="card-info">
                  <h3>{movie.title}</h3>
                  <div className="meta">
                    <span>{movie.lang}</span>
                    {movie.genre.map((g, i) => <span key={i}>{g}</span>)}
                  </div>
                  <div className="rating-row">
                    <span>★ {movie.rating} / 10</span>
                  </div>
                 
                  {movie.show && (
                    <div className="show-time">
                      <b>{movie.show.label}:</b> {movie.show.time}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Theatres;