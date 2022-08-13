const isActiveButton = ({ status }) => {
  if (status === 1) {
    return (
      <button
        className="btn add-btn status"
        // onClick={() => showDeleteClassFormPopup({ id, name })}
      ></button>
    );
  }
  return (
    <button
      className="btn delete-btn status"
      // onClick={() => showDeleteClassFormPopup({ id, name })}
    ></button>
  );
};
export default isActiveButton;
