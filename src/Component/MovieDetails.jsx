import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetails({ movies }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies[id];
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [babySeats, setBabySeats] = useState([]);
  const [paymentTab, setPaymentTab] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [upiPaid, setUpiPaid] = useState(false);
  const [cardPaid, setCardPaid] = useState(false);

  if (!movie) return <h1 className="not-found">Movie Not Found</h1>;

  const rows = 18;
  const cols = 8;
  const rowLabels = "ABCDEFGHIJKLMNOPQR".split("");


  const coupleSeats = [];
  for (let r = 0; r < rows; r++) {
    const start = r * cols + 1;
    coupleSeats.push(start, start + 1, start + cols - 2, start + cols - 1);
  }

  const remainingSeats = [];
  for (let i = 1; i <= rows * cols; i++) {
    if (!coupleSeats.includes(i)) remainingSeats.push(i);
  }

  const familySeats = remainingSeats.slice(40, -12);
  const normalSeats = remainingSeats.slice(0, 40);
  const premiumSeats = remainingSeats.slice(-12);

  const bookedSeats = [5, 6, 12, 20, 44, 60, 75];


  const getSeatLabel = (seatId) => {
    const rowIndex = Math.floor((seatId - 1) / cols);
    const colIndex = (seatId - 1) % cols;
    return `${rowLabels[rowIndex]}${colIndex + 1}`;
  };

  
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
  
    setUpiPaid(false);
    setCardPaid(false);
  };

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
        gstCouple += seatPrice * 0.15;
      } else if (premiumSeats.includes(seat)) {
        seatPrice = 299;
        gstPremium += seatPrice * 0.15;
      } else if (familySeats.includes(seat)) {
        seatPrice = 150;
        if (babySeats.includes(seat)) seatPrice += 10;
        gstFamily += seatPrice * 0.12;
      } else {
        seatPrice = 99;
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

  
  const handleUpiPay = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before paying.");
      return;
    }
    if (!upiId.trim()) {
      alert("Please enter your UPI ID.");
      return;
    }
    setUpiPaid(true);
  };

  
  const handleCardPay = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat before paying.");
      return;
    }
    setCardPaid(true);
  };

  const isPaid = upiPaid || cardPaid;

  return (
    <div className="movie-details-container">
      <div className="top-section">

        
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <img src={movie.img} alt={movie.title} className="movie-img" />
          <p><b>Language:</b> {movie.lang}</p>
          <p><b>Genres:</b> {movie.genre.join(", ")}</p>
          <p><b>Rating:</b> {movie.rating} / 10</p>
        </div>

        
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
                      title={getSeatLabel(seatId)}
                    >
                      <span className="seat-num">{colIndex + 1}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

                   <div className="legend">
            <span className="box premium"></span> Premium
            <span className="box couple"></span> Couple
            <span className="box family"></span> Family
            <span className="box normal"></span> Normal
          </div>

          
          <div className="summary">
            <p>
              <b>Seats:</b>{" "}
              {selectedSeats.length > 0
                ? selectedSeats.map(s => getSeatLabel(s)).join(", ")
                : "None"}
            </p>
            <p><b>Subtotal:</b> ₹{price.subtotal}</p>
            {(price.gstNormal + price.gstFamily + price.gstPremium + price.gstCouple) > 0 && (
              <>
                <p><b>GST Breakdown:</b></p>
                {price.gstNormal > 0 && <p>Normal 10%: ₹{price.gstNormal.toFixed(2)}</p>}
                {price.gstFamily > 0 && <p>Family 12%: ₹{price.gstFamily.toFixed(2)}</p>}
                {price.gstPremium > 0 && <p>Premium 18%: ₹{price.gstPremium.toFixed(2)}</p>}
                {price.gstCouple > 0 && <p>Couple 10%: ₹{price.gstCouple.toFixed(2)}</p>}
              </>
            )}
            <p><b>Total:</b> ₹{price.total.toFixed(2)}</p>
            <p>
              {selectedSeats.some(s => coupleSeats.includes(s)) && "👩‍❤️‍💋‍👨 Couple: 1 Ice Cream 🍦 Free!  "}
              {selectedSeats.some(s => babySeats.includes(s)) && "👨‍👨‍👧‍👦 Family: 🍼 Milk ₹10 for Baby!"}
            </p>
          </div>

                    <div className="payment-box">
            <h3>Payment</h3>

            
            <div className="payment-tabs">
              <button
                className={`tab-btn ${paymentTab === "card" ? "active" : ""}`}
                onClick={() => { setPaymentTab("card"); setUpiPaid(false); setCardPaid(false); }}
              >
                💳 Card
              </button>
              <button
                className={`tab-btn ${paymentTab === "upi" ? "active" : ""}`}
                onClick={() => { setPaymentTab("upi"); setUpiPaid(false); setCardPaid(false); }}
              >
                📱 UPI
              </button>
            </div>

                      {paymentTab === "card" && (
              <div className="card-form">
                <input placeholder="Card Number" maxLength={19} />
                <input placeholder="Name on Card" />
                <div className="card-row">
                  <input placeholder="MM/YY" maxLength={5} />
                  <input placeholder="CVV" maxLength={3} type="password" />
                </div>
                <button className="pay-btn card-pay-btn" onClick={handleCardPay}>
                  {cardPaid ? "✅ Payment Done!" : `Pay ₹${price.total.toFixed(2)}`}
                </button>
              </div>
            )}

            
            {paymentTab === "upi" && (
              <div className="upi-form">
                
                <div className="upi-logos">
                  <div className="upi-logo-item">
                    
                    <svg viewBox="0 0 48 48" width="44" height="44">
                      <circle cx="24" cy="24" r="24" fill="#fff"/>
                      <text x="24" y="20" textAnchor="middle" fontSize="7" fill="#4285F4" fontWeight="bold">G</text>
                      <text x="24" y="30" textAnchor="middle" fontSize="6" fill="#34A853">Pay</text>
                    </svg>
                    <span>GPay</span>
                  </div>
                  <div className="upi-logo-item">
                    
                    <svg viewBox="0 0 48 48" width="44" height="44">
                      <circle cx="24" cy="24" r="24" fill="#5F259F"/>
                      <text x="24" y="28" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">Pe</text>
                    </svg>
                    <span>PhonePe</span>
                  </div>
                  <div className="upi-logo-item">
                    
                    <svg viewBox="0 0 48 48" width="44" height="44">
                      <rect width="48" height="48" rx="10" fill="#00BAF2"/>
                      <text x="24" y="30" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">Paytm</text>
                    </svg>
                    <span>Paytm</span>
                  </div>
                  <div className="upi-logo-item">
                    
                    <svg viewBox="0 0 48 48" width="44" height="44">
                      <rect width="48" height="48" rx="10" fill="#00529B"/>
                      <text x="24" y="30" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="bold">BHIM</text>
                    </svg>
                    <span>BHIM</span>
                  </div>
                </div>

                <p className="upi-label">Enter your UPI ID</p>
                <div className="upi-input-row">
                  <input
                    className="upi-input"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                  />
                </div>
                <button className="pay-btn upi-pay-btn" onClick={handleUpiPay}>
                  {upiPaid ? "✅ Payment Done!" : `Pay ₹${price.total.toFixed(2)} via UPI`}
                </button>
              </div>
            )}
          </div>

          
          <button
            className="book-btn"
            onClick={() => {
              if (selectedSeats.length === 0) {
                alert("Please select at least one seat");
                return;
              }
              if (!isPaid) {
                alert("Please complete payment before booking.");
                return;
              }
              const seatLabels = selectedSeats.map(s => getSeatLabel(s)).join(", ");
              alert(` Booking Confirmed!\nSeats: ${seatLabels}\nTotal Paid: ₹${price.total.toFixed(2)}\n\nEnjoy the movie! 🍿`);
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
