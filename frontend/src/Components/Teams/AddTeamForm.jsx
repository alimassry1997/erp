import { useEffect, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import "./AddTeamForm.css";
import axios from "axios";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

const AddTeamForm = ({
  token,
  setReloadTeams,
  reloadTeams,
  getUnassignedEmployees,
  unassignedEmployees,
  loadingUnassignedEmployees,
}) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [optionSelected, setOptionSelected] = useState(null);
  let canSubmit = false;
  let employees = [];
  const { name } = formData;

  if (!loadingUnassignedEmployees) {
    for (let i = 0; i < unassignedEmployees.length; i++) {
      employees.push({
        value: unassignedEmployees[i].email,
        label: `${unassignedEmployees[i].first_name} ${unassignedEmployees[i].email}`,
      });
    }
  }

  // On Change for controlled fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submission Function
  const AddNewTeam = async (userData) => {
    try {
      const response = await axios.post("/api/teams/", userData, {
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
        const data = new FormData();
        data.append("name", name);
        const message = await AddNewTeam(formData);
        setSuccess(message);
        setReloadTeams(!reloadTeams);
        setFormData({
          name: "",
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
    if (values.name === "") {
      errorMessages.name = " Name is required";
    } else {
      errorMessages.name = "";
    }
    if (errorMessages.name === "") {
      canSubmit = true;
    }
    return errorMessages;
  };

  // Reset Messages after 5 seconds
  useEffect(() => {
    getUnassignedEmployees();
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

  /**
   * Multi Select Section
   */

  const handleChange = (selected) => {
    setOptionSelected({
      optionSelected: selected,
    });
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  return (
    <div className="form-section add-team-form">
      <section className="heading">
        <h2>
          <AiOutlineTeam /> Add New Team
        </h2>
        <p>Enter your information below</p>
        {success && <p className="succeed-msg">{success}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={errors.name ? "error" : "form-valid"}
              name="name"
              id="name"
              placeholder="Enter your team name"
              onChange={onChange}
            />
            <p>{errors.name}</p>
          </div>
          {!loadingUnassignedEmployees && (
            <ReactSelect
              name="employees"
              options={employees}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{
                Option,
              }}
              onChange={() => handleChange(optionSelected)}
              allowSelectAll={true}
            />
          )}
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block"
              value="Add New Team"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddTeamForm;
