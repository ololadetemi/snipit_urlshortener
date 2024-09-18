import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const handleShorten = async () => {
    try {
      // Send the URL to the backend for shortening
      const response = await axios.post('http://localhost:5040/shorten', { url });
      const { shortUrl, qrCodeData, clicks } = response.data;
      
      setShortenedUrl(shortUrl);
      setQrCode(qrCodeData); // QR code data from backend
      setClickCount(clicks); // Initial click count from backend
      
      // Trigger the animation
      playCutAnimation();
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="scissors-logo">✂️ SnipIt!</h1>
        <input
          type="text"
          placeholder="Enter URL"
          className="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="shorten-button" onClick={handleShorten}>
          Shorten URL
        </button>

        {shortenedUrl && (
          <div className="results">
            <p>Shortened URL: <a href={shortenedUrl}>{shortenedUrl}</a></p>
            <p>Click Count: {clickCount}</p>

            {qrCode && (
              <div className="qr-code">
                <p>Scan QR Code:</p>
                <QRCodeCanvas value={shortenedUrl} size={128} />
              </div>
            )}
          </div>
        )}
      </header>
      <div id="animation-area"></div>
    </div>
  );
}

function playCutAnimation() {
  const animationArea = document.getElementById("animation-area");
  const scissors = document.createElement("div");
  scissors.innerText = "✂️";
  scissors.classList.add("scissors");
  animationArea.appendChild(scissors);

  animationArea.classList.add("show-animation");

  setTimeout(() => {
    animationArea.classList.remove("show-animation");
    animationArea.removeChild(scissors); // Remove scissors after animation
  }, 2000);
}

export default App;


