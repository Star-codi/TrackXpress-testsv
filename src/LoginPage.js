import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');

  const handleLogin = () => {
    // Perform phone number verification logic
    // You can use an OTP verification API or check against a hardcoded OTP for demonstration purposes

    // Assuming successful verification for the default test OTP value of 123456
    if (otp === '123456') {
      onLogin();
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="login-container">
      <h1>TrackXpress</h1>
      <div className="image-container">
        <img src="https://d2kh7o38xye1vj.cloudfront.net/wp-content/uploads/2021/10/banner-tracking.png" alt="Banner" />
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
