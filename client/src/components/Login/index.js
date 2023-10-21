import React, {  useState } from "react";
import "./styles.css";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginObj, setLoginObj] = useState({
    email: "",
    password: "",
  });
  const [message,setMessage] = useState("")

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/upload")
  //   }
  // }, []);

  const handleInputChange = (e) => {
    setLoginObj({
      ...loginObj,
      [e.target.name]: e.target.value,
    });
    console.log(loginObj);
  };

  const handleSubmit = (e) => {
    console.log("login");
    axios
      .post(`https://qr-scanner-xb07.onrender.com/user/login`, loginObj)
      .then((res) => {
        // console.log(res.data.data.token);
        console.log(res.data.token);
        setMessage(res.data.message)
        if(res.data.message === "Login Success"){
            localStorage.setItem("token", res.data.token);
            navigate("/upload")
          }
      
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form">
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="email-icon" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={loginObj.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="password-icon" />
            <input
              type="password"
              placeholder="Password"
              value={loginObj.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>
        </div>
        {message && <p style={{color:message==="Login Success"?"green":"red"}}>{message}</p>}
        <div className="submit-container">
          <div className="submit" onClick={() => navigate("/")}>
            Sign Up
          </div>
          <div className="submit" onClick={handleSubmit}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;