import { useEffect, useState } from "react";
import axios from "axios";
import "./AssignSkillForm.css";
import makeAnimated from "react-select/animated";
import { GiSkills } from "react-icons/gi";
import Select from "react-select";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import DiscreteSlider from "../Layout/DiscreteSlider";
import { FaUsersCog } from "react-icons/fa";

const ChangeRoleForm = ({
  token,
  reloadEmployee,
  setReloadEmployee,
  loadingEmployeeProjects,
  employeeProjects,
  getProjectsEmployee,
  changeRole,
}) => {
  const { first_name, last_name, email } = changeRole;
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectErrors, setSelectErrors] = useState("");
  const [optionSelected, setOptionSelected] = useState("");
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(1);
  let canSubmit = false;
  const animatedComponents = makeAnimated();
  const skillsList = [];
  const onChange = (item) => {
    setOptionSelected(item);
    setShow(true);
  };

  if (!loadingEmployeeProjects) {
    for (let i = 0; i < employeeProjects.length; i++) {
      skillsList.push({
        value: employeeProjects[i].id,
        label: capitalizeFirstLetter(employeeProjects[i].name),
      });
    }
  }

  // Submission Function
  const evaluate = async (userData) => {
    try {
      const response = await axios.post(
        `/api/employees/evaluation/${email}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data) {
        const { data: message } = response;
        setReloadEmployee(!reloadEmployee);
        return message;
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
      throw new Error();
    }
  };

  // On Submit Action
  const onSubmit = async (e) => {
    e.preventDefault();
    if (optionSelected === "") {
      canSubmit = false;
      setSelectErrors("Select a skill");
    } else {
      canSubmit = true;
      setSelectErrors("");
      if (canSubmit) {
        try {
          const data = new FormData();
          data.append("score", score.toString());
          data.append("skill", optionSelected.value.toString());
          const message = await evaluate(data);
          setSuccess(message.message);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  // Reset Messages after 5 seconds
  useEffect(() => {
    getProjectsEmployee(email);
    if (errorMessage || selectErrors) {
      setTimeout(() => {
        setErrorMessage("");
        setSelectErrors("");
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [errorMessage, success, selectErrors]);

  return (
    <div className="form-section add-team-form">
      <section className="heading">
        <h2>
          <FaUsersCog /> {first_name} {last_name}
        </h2>
        <p>Change Employee's Role in a Project</p>
        {success && <p className="succeed-msg">{success}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
        {selectErrors && <p className="error-msg">{selectErrors}</p>}
      </section>
      <section className="form">
        <Select
          id={`select-skills`}
          components={animatedComponents}
          onChange={(item) => onChange(item)}
          options={skillsList}
          isSearchable
          isLoading={loadingEmployeeProjects}
          closeMenuOnSelect={true}
        />
        {show && (
          <div className="rating">
            <DiscreteSlider score={score} setScore={setScore} />
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="submit" className="btn btn-block" value="Evaluate" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ChangeRoleForm;
