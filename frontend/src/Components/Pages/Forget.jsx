import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Forget = ({ auth }) => {
  document.title = "Forgot Password | ERP";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const { email } = formData;

  const onChangeEmail = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
  

  const submitForm = async (e) => {
    e.preventDefault();
      setErrors(validate(formData));
      const response = await axios.post("/api/forgetpassword", formData);
      setFormData({ email: "" });
    
  };



  const validate = (values) => {
    const errorMessages = {};
    if (values.email === "") {
      errorMessages.email = "Email is required";
      
    }
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
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <div className="form-input-div">
                <div>
                  <HiOutlineMail />
                </div>
                <input
                  type="text"
                  className={errors.email ? "error" : "form-valid"}
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChangeEmail}
                  
                />
              </div>
              <p>{errors.email}</p>
            </div>
            <div className="form-group reset">
             <input type="submit" className="btn" value="Send Email" />
            <Link to="/login" className="btn dark-btn">Back </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Forget;
