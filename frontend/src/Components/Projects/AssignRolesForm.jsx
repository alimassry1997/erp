import { useEffect, useState } from "react";
import { FaUsersCog } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const AssignRolesForm = ({
  token,
  roles,
  loadingRoles,
  assignTeam,
  getTeam,
  relatedEmployeesTeam,
  loadingTeam,
}) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const { name: teamName, slug } = assignTeam;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [optionSelected, setOptionSelected] = useState([]);
  let canSubmit = false;
  const animatedComponents = makeAnimated();
  const { name } = formData;
  const rolesList = [];

  // On Change for controlled fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  if (!loadingRoles) {
    for (let i = 0; i < roles.length; i++) {
      rolesList.push({
        value: roles[i].id,
        label: capitalizeFirstLetter(roles[i].name),
      });
    }
  }

  // Submission Function
  const AddNewProject = async (userData) => {
    try {
      const response = await axios.post("/api/projects/", userData, {
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
        data.append("teams", JSON.stringify(optionSelected));
        const message = await AddNewProject(data);
        setSuccess(message.message);
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
      errorMessages.name = "Name is required";
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
    getTeam(slug);
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
          <FaUsersCog /> {teamName}
        </h2>
        <p>Assign Roles to this team's employees</p>
        {success && <p className="succeed-msg">{success}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          {!loadingTeam &&
            relatedEmployeesTeam.map((employee) => <div>{employee.name}</div>)}
          <Select
            components={animatedComponents}
            onChange={(item) => setOptionSelected(item)}
            options={rolesList}
            isSearchable
            isLoading={loadingRoles}
            closeMenuOnSelect={false}
          />
          <div className="form-group">
            <input type="submit" className="btn btn-block" value="Submit" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AssignRolesForm;
