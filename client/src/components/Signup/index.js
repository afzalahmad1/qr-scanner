import React, { useState } from "react";
import "./styles.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(user);
  };

  const registerUser = async () => {
    try {
      const data = await axios.post(
        "https://qr-scanner-xb07.onrender.com/user/register",
        user
        );
      console.log(data);
      setMessage(data.data.message);
      // if(data.data.message === "User has been created!"){
      //   navigate("/login")
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form">
      <div className="container">
        <div className="header">
          <div className="text">SignUp</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="user-icon" />
            <input
              type="text"
              placeholder="Name"
              onChange={handleUser}
              name="name"
              required
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="email-icon" />
            <input
              type="email"
              placeholder="Email"
              onChange={handleUser}
              name="email"
              required
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="password-icon" />
            <input
              type="password"
              placeholder="Password"
              onChange={handleUser}
              name="password"
              required
            />
          </div>
        </div>
        {message && (
          <div
            className="message"
            style={{
              color: message === "User has been created!" ? "green" : "red",
            }}
          >
            {message}
          </div>
        )}
        <div className="submit-container">
          <div className="submit" onClick={registerUser}>
            Sign Up
          </div>
          <div className="submit" onClick={() => navigate("/login")}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;