const ProjectStatus = ({ status }) => {
  if (status === 0) {
    return <button className="btn add-btn">Active</button>;
  }
  return <button className="btn edit-btn">Done</button>;
};

export default ProjectStatus;
