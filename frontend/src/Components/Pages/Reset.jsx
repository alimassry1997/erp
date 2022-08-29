import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoBarcode } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import "./Reset.css";
import { useNavigate } from "react-router-dom";


const Reset = ({ auth }) => {
  document.title = "Reset Password | ERP";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    token: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  

  useEffect(() => {
    
    if (auth) {
      navigate("/");
    }
  }, [ auth]);

  const onChangePass = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/resetpassword", formData);
    setFormData({
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <section className="heading">
          <h1>Reset Your Password</h1>
        </section>
        <section className="form">
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label className="form-label">Pincode:</label>
              <div className="form-input-div">
                <div>
                  <IoBarcode />
                </div>
                
                <input
                  type="number"
                  className="form-valid"
                  name="token"
                  id="token"
                  // value={password}
                  onChange={onChangePass}
                  placeholder="Enter your Pincode"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email:</label>
              <div className="form-input-div">
                <div>
                  <HiOutlineMail />
                </div>
                <input
                  type="email"
                  className="form-valid"
                  name="email"
                  id="email"
                  // value={email}
                  onChange={onChangePass}
                  placeholder="Enter your Email Address"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password:</label>
              <div className="form-input-div">
                <div>
                  <RiLockPasswordFill />
                </div>
                <input
                  type="password"
                  name="password"
                  className="form-valid"
                  id="pass"
                  // value={password}
                  onChange={onChangePass}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm The Password:</label>
              <div className="form-input-div">
                <div>
                  <RiLockPasswordFill />
                </div>
                <input
                  type="password"
                  className="form-valid"
                  name="password_confirmation"
                  id="passCon"
                  // value={password}
                  onChange={onChangePass}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div className="form-group reset">
              <input type="submit" className="btn" value="Reset" />
              <Link to="/login" className="btn dark-btn">
                Back
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Reset;
