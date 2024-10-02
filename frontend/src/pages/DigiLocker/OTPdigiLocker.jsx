import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./OTPdigiLocker.css"; // Ensure this path is correct for the CSS file
import digiLogo from "../../assets/digilocker.png";
import govLogo from "../../assets/govLogo.png";

function DigiLockerPin() {
  const [pin, setPin] = useState(new Array(6).fill("")); // State to hold each digit of the PIN
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Handle the change in each PIN input field
  const handlePinChange = (element, index) => {
    if (isNaN(element.value)) return; // Ensure only numbers are entered

    const newPin = [...pin];
    newPin[index] = element.value;
    setPin(newPin);

    // Automatically focus the next input box if current one is filled
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // Handle form submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredPin = pin.join(""); // Combine the PIN array into a single string
    if (enteredPin === '123456') {
      // PIN is correct
      const userEmail = userInfo?.email || 'guest';
      localStorage.setItem(`documentsFetched_${userEmail}`, 'true'); // Set flag in localStorage
      alert('Documents Fetched Successfully!');
      navigate('/startup/dashboard'); // Redirect to the application page
    } else {
      alert('Incorrect PIN. Please try again.');
      setPin(new Array(6).fill("")); // Reset the PIN inputs
    }
  };

  return (
    <div className="digilocker-pin-container">
      <div className="header">
        <img
          className="govt-logo"
          src={govLogo}
          alt="Government Logo"
        />
        <img
          className="digilocker-logo"
          src={digiLogo}
          alt="DigiLocker"
        />
      </div>

      <div className="content">
        <p className="description">
          6 digit PIN provides extra security to your account with two-factor
          authentication. Don’t disclose your Security PIN to anyone.
        </p>
        <p className="description-otp">
          <b>Please enter your 6 digit PIN to sign-in</b>
        </p>

        <form onSubmit={handleOtpSubmit}>
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
