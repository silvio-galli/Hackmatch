import React from "react";

const Random = props => {
  return (
    <div className="col-md-6 col-sm-6 col-6">
      <h1>Random Candidate</h1>
      <img src={props.random.picUrl} alt="" />
      <h2>
        {props.random.name} {props.random.surname}
      </h2>
      <p>
        <strong>Number of Likes:</strong> {props.random.numberOfLikes}
        { " | " }
        <strong>Number of Nexts:</strong> {props.random.numberOfNexts}
        </p>
      <button onClick={props.handleClickOnRandom} name="like" disabled={props.disableButton}>Like</button>
      {"  "}
      <button onClick={props.handleClickOnRandom} name="next" disabled={props.disableButton}>Next</button>
    </div>
  )
}

export default Random;