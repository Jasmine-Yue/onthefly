import React, { useState } from "react";
import "./ActivityBtn.css";

const ActivityBtn = (props) => {
  const [num_votes, setNumVotes] = useState(props.num_votes);

  const updateCount = async () => {
    //const url = `/api/activities/${props.id}`;
    const url = `${props.api_url}/api/activities/${props.id}`;

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ num_votes: num_votes + 1 }),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    setNumVotes((num_votes) => num_votes + 1);
  };

  return (
    <button className="activityBtn" id={props.id} onClick={updateCount}>
      {props.activity} <br /> {"△ " + num_votes + " Upvotes"}
    </button>
  );
};

export default ActivityBtn;
