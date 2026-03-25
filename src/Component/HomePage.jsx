import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logo from '../Assets/CineBook logo.png';
import movieImg1 from '../Assets/avenger-2.jpg';
import movieImg2 from '../Assets/jananayagan.jpg';
import movieImg3 from '../Assets/The Dark Knight.jpg';
import Carousel from 'react-bootstrap/Carousel';

function HomePage() {
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY); // debug

      if (window.scrollY > 50) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const carouselMovies = [
    { img: movieImg1, title: "AVENGERS", desc: "Earth's mightiest heroes must come together to stop the biggest threat the world has ever faced." },
    { img: movieImg2, title: "JANANAYAGAN", desc: "A powerful political drama showing the rise of a leader who fights for justice." },
    { img: movieImg3, title: "THE DARK KNIGHT", desc: "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos." },
  ];

  const scrollToAbout = (e) => {
    e.preventDefault();
    const section = document.getElementById('about-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>

      {/* NAV */}
      <div className={`nav ${showNav ? "show" : "hide"}`}>
        <div className='logo'>
          <img src={logo} alt="logo" style={{ height: '40px' }} />
          cineBook
        </div>

        <div className='search'>
          <input type='text' placeholder='search the movies' />
        </div>

        <div className='menu'>
          <a href='#' onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
          <a href='#' onClick={(e) => { e.preventDefault(); navigate("/movies"); }}>Movies</a>
          <a href='#' onClick={(e) => { e.preventDefault(); navigate("/theatres"); }}>Theatres</a>
          <a href='#' onClick={scrollToAbout}>About Us</a>
          <a href='#' onClick={(e) => { e.preventDefault(); navigate("/contact"); }}>Contact Us</a>
          <Button className='button' onClick={() => navigate("/login")}>Login</Button>
          <Button className='button'>Signup</Button>
        </div>
      </div>

      {/* MAIN */}
      <div className='main'>
        <Carousel className="movie-carousel">
          {carouselMovies.map((movie, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={movie.img} alt={movie.title} />
              <Carousel.Caption className="hero-text">
                <h1>{movie.title}</h1>
                <p>{movie.desc}</p>
                <button className="ticket-btn" onClick={() => navigate(`/movie/${index}`)}>
                  Book Ticket
                </button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

    </div>
  );
}

export default HomePage;