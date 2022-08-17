import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";

const AddAdminForm = ({ token, setReloadAdmins, reloadAdmins }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pic, setPic] = useState([]);
  let canSubmit = false;
  const { first_name, last_name, email, phone_number, password } = formData;

  const handleImage = (e) => {
    setPic({ image: e.target.files[0] });
  };

  // On Change for controlled fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submission Function
  const AddNewAdmin = async (userData) => {
    try {
      const response = await axios.post("/api/admins/", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        const { data: message } = response;
        return message;
      }
    } catch (err) {
      setErrorMessage(err.response.data);
      throw new Error();
    }
  };

  // On Submit Action
  const onSubmit = async (a) => {
    a.preventDefault();
    setErrors(validate(formData));
    if (canSubmit) {
      try {
        const { image } = pic;
        const data = new FormData();
        data.append("image", image);
        data.append("first_name", first_name);
        data.append("last_name", last_name);
        data.append("email", email);
        data.append("phone_number", phone_number);
        data.append("system_role_id", "1");
        data.append("password", password);

        const message = await AddNewAdmin(data);
        setSuccess(message.message);
        setReloadAdmins(!reloadAdmins);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          password: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Validation for Enroll Form
  const validate = (values) => {
    canSubmit = false;
    const errorMessages = {};
    if (values.first_name === "") {
      errorMessages.first_name = "First name is required";
    } else {
      errorMessages.first_name = "";
    }
    if (values.last_name === "") {
      errorMessages.last_name = "Last name is required";
    } else {
      errorMessages.last_name = "";
    }
    if (values.email === "") {
      errorMessages.email = "Email is required";
    } else {
      errorMessages.email = "";
    }
    if (values.phone_number === "") {
      errorMessages.phone_number = "Phone Number is required";
    } else {
      errorMessages.phone_number = "";
    }
    if (values.password === "") {
      errorMessages.password = "Password is required";
    }
    if (
      errorMessages.first_name === "" &&
      errorMessages.last_name === "" &&
      errorMessages.email === "" &&
      errorMessages.phone_number === "" &&
      errorMessages.password === ""
    ) {
      canSubmit = true;
    }
    return errorMessages;
  };

  // Reset Messages after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [errorMessage, success]);

  return (
    <div className="form-section add-team-form">
      <section className="heading">
        <h2>
          <AiOutlineUser /> Add New Admin
        </h2>
        <p>Enter your information below</p>
        {success && <p className="succeed-msg">{success}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className={errors.first_name ? "error" : "form-valid"}
              name="first_name"
              id="first_name"
              placeholder="Enter your employee name"
              onChange={onChange}
            />
            <p>{errors.first_name}</p>
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className={errors.last_name ? "error" : "form-valid"}
              name="last_name"
              id="last_name"
              placeholder="Enter your last name"
              onChange={onChange}
            />
            <p>{errors.last_name}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={errors.email ? "error" : "form-valid"}
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={onChange}
            />
            <p>{errors.email}</p>
          </div>
          <div className="form-group">
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className={errors.phone_number ? "error" : "form-valid"}
              name="phone_number"
              id="phone_number"
              placeholder="Enter your phone number"
              onChange={onChange}
            />
            <p>{errors.phone_number}</p>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={errors.password ? "error" : "form-valid"}
              name="password"
              id="password"
              placeholder="Enter your Password"
              onChange={onChange}
            />
            <p>{errors.password}</p>
          </div>
          <input
            type="file"
            name="picture"
            onChange={handleImage}
            placeholder="Upload your Image"
          ></input>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block"
              value="Add New Admin"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddAdminForm;
