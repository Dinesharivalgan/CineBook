import { useLocation, useNavigate } from 'react-router-dom';
import './MovieList.css';
import About from './About';

export const movies = [
  // Tamil Movies
  { title: "Dhurandhar", lang: ["Hindi"], genre: ["Thriller"], rating: "7.8", img: require('../Assets/movie list/dhurandhar.webp'), category: "tamil" },
  { title: "Thaai Kizhavi", lang: ["Tamil"], genre: ["Drama"], rating: "8.2", img: require('../Assets/movie list/thaai kizhavi.webp'), category: "tamil" },
  { title: "With Love", lang: ["Tamil"], genre: ["Romance"], rating: "7.5", img: require('../Assets/movie list/withlove.webp'), category: "tamil" },
  { title: "Kolai Seval", lang: ["Tamil"], genre: ["Crime"], rating: "8.0", img: require('../Assets/movie list/kolaiseval.jpg'), category: "tamil" },
  { title: "Karupu", lang: ["Tamil"], genre: ["Action"], rating: "9.0", img: require('../Assets/movie list/karupu.jpeg'), category: "tamil" },
  { title: "Thalapathi", lang: ["Tamil"], genre: ["Action", "Drama"], rating: "9.2", img: require('../Assets/movie list/thalapathi.jpeg'), category: "tamil" },

  // Hollywood Movies
  { title: "F1", lang: ["Tamil", "English"], genre: ["Action", "Sport", "Drama"], rating: "8.5", img: require('../Assets/movie list/F1.webp'), category: "hollywood" },
  { title: "Narniya", lang: ["Tamil", "English"], genre: ["Fantasy", "Drama", "History"], rating: "9.8", img: require('../Assets/movie list/naraniya.jpg'), category: "hollywood" },
  { title: "Once Upon A Time", lang: ["Tamil", "English"], genre: ["Action", "Drama"], rating: "9.2", img: require('../Assets/movie list/once upon a time.webp'), category: "hollywood" },
  { title: "Kill Bill", lang: ["Tamil", "English"], genre: ["Action", "Drama"], rating: "8.2", img: require('../Assets/movie list/kill bill.jpg'), category: "hollywood" },
  { title: "Joker", lang: ["English"], genre: ["Psychology", "Thriller"], rating: "9.1", img: require('../Assets/movie list/joker.jpg'), category: "hollywood" },
];

function MovieCard({ movie, globalIndex, navigate }) {
  return (
    <div
      className="card"
      onClick={() => navigate(`/movie/${globalIndex}`)}
    >
      <div className="card-img-wrapper">
        <img src={movie.img} alt={movie.title} />
        <div className="overlay">
          <button
            className="book-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${globalIndex}`);
            }}
          >
            🎟 Book Now
          </button>
        </div>
      </div>
      <div className="card-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="meta">
          {movie.lang.map((l, i) => (
            <span key={i} className="lang-badge">{l}</span>
          ))}
          {movie.genre.map((g, i) => (
            <span key={i} className="genre-badge">{g}</span>
          ))}
        </div>
        <div className="rating-row">
          <span>★ {movie.rating} / 10</span>
        </div>
      </div>
    </div>
  );
}

function MovieList() {
  const navigate = useNavigate();
  const location = useLocation();
  const theatreMovies = location.state?.theatreMovies || movies;
  const theatreName = location.state?.theatre || "All Theatres";

  const tamilMovies = theatreMovies.filter(m => m.category === "tamil");
  const hollywoodMovies = theatreMovies.filter(m => m.category === "hollywood");

  // Only show AboutSection when on home page (no theatre filter)
  const isHomePage = !location.state?.theatre;

  return (
    <>
      <div className="movie-list-container">
        <h2 className="page-title">{theatreName} — Now Showing</h2>

        {/* Tamil Section */}
        {tamilMovies.length > 0 && (
          <section className="movie-section">
            <div className="section-header tamil-header">
              <span className="section-flag">🎬</span>
              <h3 className="section-title">Tamil Films</h3>
              <div className="section-line" />
            </div>
            <div className="list">
              {tamilMovies.map((movie) => {
                const globalIndex = movies.findIndex(m => m.title === movie.title);
                return (
                  <MovieCard
                    key={movie.title}
                    movie={movie}
                    globalIndex={globalIndex}
                    navigate={navigate}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Hollywood Section */}
        {hollywoodMovies.length > 0 && (
          <section className="movie-section">
            <div className="section-header hollywood-header">
              <span className="section-flag">🌟</span>
              <h3 className="section-title">Hollywood</h3>
              <div className="section-line" />
            </div>
            <div className="list">
              {hollywoodMovies.map((movie) => {
                const globalIndex = movies.findIndex(m => m.title === movie.title);
                return (
                  <MovieCard
                    key={movie.title}
                    movie={movie}
                    globalIndex={globalIndex}
                    navigate={navigate}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* About Section - only on home page, below movie list */}
      {isHomePage && <About />}
    </>
  );
}

export default MovieList;