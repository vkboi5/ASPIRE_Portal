import React, { useState } from "react";
import "./OTPdigiLocker.css"; // Make sure this path is correct for the CSS file
import digiLogo from "../../assets/digilocker.png";
import govLogo from "../../assets/govLogo.png";
function DigiLockerPin() {
  const [pin, setPin] = useState(new Array(6).fill(""));

  // Handle the change in each pin input
  const handlePinChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newPin = [...pin];
    newPin[index] = element.value;

    setPin(newPin);

    // Automatically focus next input box
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Your entered PIN is: ${pin.join("")}`);
  };

  return (
    <div className="digilocker-pin-container">
      <div className="header">
        <img
          className="govt-logo"
          src={govLogo} // Add your own logo path
          alt="Government Logo"
        />
        <img
          className="digilocker-logo"
          src={digiLogo} // Add your own DigiLocker logo path
          alt="DigiLocker"
        />
      </div>

      <div className="content">
        <p className="description">
          6 digit PIN provides extra security to your account with two-factor
          authentication. Don’t disclose your Security PIN to anyone.
        </p>
        <p className="description-otp">
            <b>Please enter your 6 digit PIN to sigin-in</b>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="pin-input-section">
            {pin.map((value, index) => (
              <input
                key={index}
                type="password"
                maxLength="1"
                value={value}
                onChange={(e) => handlePinChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="pin-input"
              />
            ))}
          </div>

          <p className="forgot-pin">
            <a href="#">Forgot my PIN</a>
          </p>

          <button type="submit" className="submit-btn">
            Done
          </button>
        </form>
      </div>
    </div>
  );
}

export default DigiLockerPin;
