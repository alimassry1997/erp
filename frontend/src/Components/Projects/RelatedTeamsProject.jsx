const RelatedTeamsProject = ({ name, slug, showAssignProjectFormPopup }) => {
  return (
    <div>
      <h3>{name}</h3>
      <button
        className="btn dark-btn"
        onClick={() => showAssignProjectFormPopup({ name, slug })}
      >
        Assign Roles
      </button>
    </div>
  );
};

export default RelatedTeamsProject;
