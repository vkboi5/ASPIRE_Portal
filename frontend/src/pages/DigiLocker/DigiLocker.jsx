import React, { useState, useEffect } from "react";
import "./DigiLocker.css";
import digiImage from "../../assets/digilocker.png";
import logo from "../../assets/logo2.png";
import securelogo from "../../assets/secureLogo.png";

function DigiLockerConsent() {
  const [aadhaarChecked, setAadhaarChecked] = useState(true);
  const [panChecked, setPanChecked] = useState(true);
  const [selectAllChecked, setSelectAllChecked] = useState(true);

  const handleSelectAll = () => {
    const newCheckedState = !selectAllChecked;
    setSelectAllChecked(newCheckedState);
    setAadhaarChecked(newCheckedState);
    setPanChecked(newCheckedState);
  };

  // For date management
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth()); // 0 = January
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

  // Function to get number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); // +1 because month index is zero-based
  };

  // Function to generate day options
  const generateDayOptions = (month, year) => {
    const days = getDaysInMonth(month, year);
    let dayOptions = [];
    for (let i = 1; i <= days; i++) {
      dayOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return dayOptions;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Consent Submitted!");
  };

  return (
    <div className="digilocker-container">
      <div className="header">
        <img className="digilogo" src={digiImage} alt="DigiLocker" />
        <img className="securelogo" src={securelogo} alt="Secure Logo" />
        <img className="logo" src={logo} alt="ASPIRE" />
      </div>

      <div className="content">
        <h3>
          Please provide your consent to share the following with <b>Zerodha</b>:
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="documents-section">
            <div className="select-all">
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAll}
                className="document-checkbox select-all-checkbox"
              />
              <div className="flexSelectAll">
                <label className="issued-docs">Issued Docs 2</label>
                <label className="select-all-label">Select all</label>
              </div>
            </div>

            <div className="document-item">
              <input
                type="checkbox"
                checked={aadhaarChecked}
                onChange={() => setAadhaarChecked(!aadhaarChecked)}
                className="document-checkbox"
              />
              <label>Aadhaar Card (XX6646)</label>
            </div>

            <div className="document-item">
              <input
                type="checkbox"
                checked={panChecked}
                onChange={() => setPanChecked(!panChecked)}
                className="document-checkbox"
              />
              <label>PAN Verification Record (XXA9660N)</label>
            </div>
          </div>

          <div className="info-section">
            <h4>Profile Information</h4>
            <p>Name, Date of Birth, Gender</p>
          </div>

          <div className="validity-section">
            <h4>Consent validity date</h4>
            <div className="date-picker">
              <label>Day:</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
              >
                {generateDayOptions(selectedMonth, selectedYear)}
              </select>

              <label>Month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                  (month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  )
                )}
              </select>

              <label>Year:</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {[currentDate.getFullYear(), currentDate.getFullYear() + 1].map(
                  (year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="purpose-section">
            <h4>Purpose</h4>
            <p>Know Your Customer</p>
          </div>

          <p className="consent-note">
            Consent validity is subject to applicable laws.
            <br />
            By clicking 'Allow', you are giving consent to share with <b>ASPIRE</b>.
          </p>

          <div className="buttons-section">
            <button type="button" className="deny-btn">
              Deny
            </button>
            <button type="submit" className="allow-btn">
              Allow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DigiLockerConsent;
