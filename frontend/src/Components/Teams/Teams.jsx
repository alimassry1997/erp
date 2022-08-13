import { useEffect } from "react";
import "./Teams.css";
import Spinner from "../Layout/Spinner";

const Teams = () => {
  document.title = "Classes Dashboard | Zumba";
  useEffect(() => {
    // fetchClasses();
  }, []);
  if (true) {
    return (
      <>
        <Spinner />
      </>
    );
  } else {
    return (
      <div className="classes-dashboard">
        <div className="header">
          <h2>Teams Management</h2>
          {/*<button className="btn add-btn" onClick={showAddClassFormPopup}>*/}
          {/*  <FaPlusSquare />*/}
          {/*</button>*/}
        </div>
        <div className="table-responsive">
          <table className="table table-classes">
            <thead>
              <tr>
                <th>Name</th>
                <th>Benefits</th>
                <th>Description</th>
                <th>Video</th>
                <th>Age Range</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {/*{classes.map((item) => (*/}
              {/*  <ClassAuthItem*/}
              {/*    key={item._id}*/}
              {/*    id={item._id}*/}
              {/*    name={item.name}*/}
              {/*    benefits={item.benefits}*/}
              {/*    description={item.description}*/}
              {/*    video_url={item.video_url}*/}
              {/*    min={item.age.min}*/}
              {/*    max={item.age.max}*/}
              {/*    singleClass={item}*/}
              {/*    showEditClassFormPopup={showEditClassFormPopup}*/}
              {/*    showDeleteClassFormPopup={showDeleteClassFormPopup}*/}
              {/*  />*/}
              {/*))}*/}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Teams;
