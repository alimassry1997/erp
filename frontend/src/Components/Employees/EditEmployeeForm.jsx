import React, { useEffect, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import axios from "axios";


const EditEmployeeForm = ({
  token,
  setReloadEmployees,
  reloadEmployees,
  editEmployee,
}) => {
  const [formData, setFormData] = useState(editEmployee);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pic, setPic] = useState([]);
  const [uniqueEmail, setUniqueEmail] = useState("");

  let canSubmit = false;
  const { first_name, last_name, email, phone_number, picture } = formData;

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
  const EditEmployee = async (userData) => {
    try {
      const response = await axios.post(`/api/user/${uniqueEmail}`, userData, {
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
        data.append("system_role_id", "2");
        data.append("_method", "PUT");
        const message = await EditEmployee(data);
        setSuccess(message.message);
        setReloadEmployees(!reloadEmployees);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
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
    if (
      errorMessages.first_name === "" &&
      errorMessages.last_name === "" &&
      errorMessages.email === "" &&
      errorMessages.phone_number === ""
    ) {
      canSubmit = true;
    }
    return errorMessages;
  };

  // Reset Messages after 5 seconds
  useEffect(() => {
    setUniqueEmail(email);
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
          <AiOutlineTeam /> Edit Employee
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
              value={first_name}
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
              value={last_name}
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
              value={email}
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
              value={phone_number}
            />
            <p>{errors.phone_number}</p>
          </div>
          <input
            type="file"
            name="picture"
            onChange={handleImage}
            placeholder="Upload your Image"
          ></input>
          
          <div className="form-group">
          <img className="popup-picture" src={picture.includes()
                ? picture
                : `${process.env.REACT_APP_BACKEND_URL}${picture}`} width="80px" alt="User Image"/>
            <input
              type="submit"
              className="btn btn-block"
              value="Edit Employee"
            />
            
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditEmployeeForm;
