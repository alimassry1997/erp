const IsActiveButton = ({ status, showDeleteEmployeePopup, employee }) => {
  if (status === 1) {
    return (
      <button
        className="btn add-btn status"
        onClick={() => showDeleteEmployeePopup(employee, false)}
      ></button>
    );
  }
  return (
    <button
      className="btn delete-btn status"
      onClick={() => showDeleteEmployeePopup(employee, true)}
    ></button>
  );
};
export default IsActiveButton;
