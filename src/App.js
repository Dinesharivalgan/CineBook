import './App.css';
import HomePage from './Component/HomePage';
import MovieList, { movies } from './Component/MovieList';
import MovieDetails from './Component/MovieDetails';
import Login from './Component/Login';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Theatres from './Component/Theatres';
import Contact from './Component/Contact';
import About from './Component/About';


function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<><HomePage /><MovieList /></>} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/theatres" element={<Theatres />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;