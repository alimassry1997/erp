import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  // const navigate = useNavigate();
  let canSubmit = false;
  const { email, password } = formData;

  document.title = "Login | ERP";

  // On Change for controlled fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submission Function
  const loginProcess = async (userData) => {
    try {
      const response = await axios.post("/api/admins/login", userData);
      if (response.data) {
        const { data: user } = response;
        return user;
      }
    } catch (err) {
      console.log(err.response);
      setErrorMessage(err.response.data);
      throw new Error();
    }
  };

  // On Submit Action
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    if (canSubmit) {
      try {
        await loginProcess({ email, password });
        setFormData({ email: "", password: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Validation for Enroll Form
  const validate = (values) => {
    canSubmit = false;
    const errorMessages = {};

    if (values.email === "") {
      errorMessages.email = "Username is required";
    } else {
      errorMessages.email = "";
    }
    if (values.password === "") {
      errorMessages.password = "Password is required";
    } else if (values.password.length < 8) {
      errorMessages.password = "Password should be at least 8 characters";
    } else {
      errorMessages.password = "";
    }
    if (errorMessages.email === "" && errorMessages.password === "") {
      canSubmit = true;
    }
    return errorMessages;
  };

  // Reset Messages after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
  }, [errorMessage]);

  return (
    <div className="login-container">
      <div className="login-form">
        <section className="heading">
          <h1>Admin Login</h1>
          <p>Enter your information below</p>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </section>
        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={errors.email ? "error" : "form-valid"}
                name="email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <label htmlFor="email">Email</label>
              <p>{errors.email}</p>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={errors.password ? "error" : "form-valid"}
                name="password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <p>{errors.password}</p>
            </div>

            <div className="form-group">
              <input type="submit" className="btn btn-block" value="Login" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
