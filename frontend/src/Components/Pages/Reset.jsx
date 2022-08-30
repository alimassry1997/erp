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
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    token: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

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

  const validate = (values) => {
    const errorMessages = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (values.email === "") {
      errorMessages.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errorMessages.email = "Invalid Email address!";
    } else {
      errorMessages.email = "";
    }
    if (values.password === "") {
      errorMessages.password = "Password is required";
    } else if (values.password.length < 8) {
      errorMessages.password = "Password should be at least 8 characters";
    } else if (values.conpassword !== values.password) {
      errorMessages.conpassword = "Password is not Confirmed";
    } else {
      errorMessages.password = "";
    }
    if (errorMessages.email === "" && errorMessages.password === "") {
    }
    return errorMessages;
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
    if (auth) {
      navigate("/");
    }
  }, [errorMessage, auth]);

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
                  // value={token}
                  required
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
                  required
                  // value={email}
                  onChange={onChangePass}
                  placeholder="Enter your Email Address"
                />
              </div>
              <p>{errors.email}</p>
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
                  required
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
                  // value={conpassword}
                  onChange={onChangePass}
                  required
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
