import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails({ movies }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies[id];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [babySeats, setBabySeats] = useState([]); // track family seats with babies

  if (!movie) return <h1 className="not-found">Movie Not Found</h1>;

  const rows = 18;
  const cols = 8;
  const rowLabels = "ABCDEFGHIJKLMNOPQR".split("");

  // Couple seats → all corners
  const coupleSeats = [];
  for (let r = 0; r < rows; r++) {
    const start = r * cols + 1;
    coupleSeats.push(start, start + 1, start + cols - 2, start + cols - 1);
  }

  // Remaining seats
  const remainingSeats = [];
  for (let i = 1; i <= rows * cols; i++) {
    if (!coupleSeats.includes(i)) remainingSeats.push(i);
  }

  const familySeats = remainingSeats.slice(40, -12);
  const normalSeats = remainingSeats.slice(0, 40);
  const premiumSeats = remainingSeats.slice(-12);

  const bookedSeats = [5, 6, 12, 20, 44, 60, 75];

  // Toggle seat selection
  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
      setBabySeats(babySeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
      if (familySeats.includes(seatId)) {
        const hasBaby = window.confirm("Is there a baby for this family seat? Milk ₹10 will be added.");
        if (hasBaby) setBabySeats([...babySeats, seatId]);
      }
    }
  };

  // Calculate subtotal, GST breakdown, and total
  const calculatePrice = () => {
    let subtotal = 0;
    let gstNormal = 0;
    let gstFamily = 0;
    let gstPremium = 0;
    let gstCouple = 0;

    selectedSeats.forEach(seat => {
      let seatPrice = 0;

      if (coupleSeats.includes(seat)) {
        seatPrice = 250;
        gstCouple += seatPrice * 0.10;
      } else if (premiumSeats.includes(seat)) {
        seatPrice = 299;
        gstPremium += seatPrice * 0.18;
      } else if (familySeats.includes(seat)) {
        seatPrice = 120;
        if (babySeats.includes(seat)) seatPrice += 10; // milk for baby
        gstFamily += seatPrice * 0.12;
      } else {
        seatPrice = 79;
        gstNormal += seatPrice * 0.10;
      }

      subtotal += seatPrice;
    });

    const totalGST = gstNormal + gstFamily + gstPremium + gstCouple;
    const total = subtotal + totalGST;

    return { subtotal, gstNormal, gstFamily, gstPremium, gstCouple, totalGST, total };
  };

  const getSeatClass = (seatId) => {
    if (bookedSeats.includes(seatId)) return "booked";
    if (selectedSeats.includes(seatId)) return "selected";
    if (coupleSeats.includes(seatId)) return "couple";
    if (premiumSeats.includes(seatId)) return "premium";
    if (familySeats.includes(seatId)) return "family";
    return "normal";
  };

  const price = calculatePrice();

  return (
    <div className="movie-details-container">
      <div className="top-section">
        {/* LEFT */}
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <img src={movie.img} alt={movie.title} className="movie-img" />
          <p><b>Language:</b> {movie.lang}</p>
          <p><b>Genres:</b> {movie.genre.join(", ")}</p>
          <p><b>Rating:</b> {movie.rating} / 10</p>
        </div>

        {/* RIGHT */}
        <div className="seat-section">
          <h2>Select Seats</h2>
          <div className="screen">SCREEN</div>
          <div className="seat-wrapper">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                <div className="row-label">{rowLabels[rowIndex]}</div>
                {Array.from({ length: cols }).map((_, colIndex) => {
                  const seatId = rowIndex * cols + colIndex + 1;
                  return (
                    <div
                      key={seatId}
                      className={`seat ${getSeatClass(seatId)}`}
                      onClick={() => toggleSeat(seatId)}
                    >
                      <span className="seat-num">{colIndex + 1}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="legend">
            <span className="box premium"></span> Premium
            <span className="box couple"></span> Couple
            <span className="box family"></span> Family
            <span className="box normal"></span> Normal
          </div>

          {/* Summary */}
          <div className="summary">
            <p><b>Seats:</b> {selectedSeats.join(", ") || "None"}</p>
            <p><b>Subtotal:</b> ₹{price.subtotal}</p>
            <p><b>GST Breakdown:</b></p>
            {price.gstNormal > 0 && <p>Normal 10%: ₹{price.gstNormal.toFixed(2)}</p>}
            {price.gstFamily > 0 && <p>Family 12%: ₹{price.gstFamily.toFixed(2)}</p>}
            {price.gstPremium > 0 && <p>Premium 18%: ₹{price.gstPremium.toFixed(2)}</p>}
            {price.gstCouple > 0 && <p>Couple 10%: ₹{price.gstCouple.toFixed(2)}</p>}
            <p><b>Total:</b> ₹{price.total}</p>
            <p><b>Offers:</b> 
              {selectedSeats.some(s => coupleSeats.includes(s)) && "👩‍❤️‍💋‍👨Couple: 1 Ice Cream 🍦 Free!"}
              {selectedSeats.some(s => babySeats.includes(s)) && "👨‍👨‍👧‍👦Family: 🍼 Milk ₹10 for Baby!"}
            </p>
          </div>

          {/* Payment */}
          <div className="payment-box">
            <h3>Payment</h3>
            <input placeholder="Card Number" /><br></br>
            <input placeholder="Name on Card" />
            <div className="row">
              <input placeholder="MM/YY" />
              <input placeholder="CVV" />
            </div>
          </div>

          <button
            className="book-btn"
            onClick={() => {
              if (selectedSeats.length === 0) {
                alert("Select seats first 🤬 useless person");
              } else {
                alert(`Booked Seats: ${selectedSeats}\nTotal: ₹${price.total} But Show Not Available😝`);
              }
            }}
          >
            Book Tickets
          </button>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        ⬅ Back
      </button>
    </div>
  );
}

export default MovieDetails;