import React from "react";

const Random = props => {
  return (
    <div className="col-md-6 col-sm-6 col-6">
      <h1>Random Candidate</h1>
      <img src={props.random.picUrl} alt="" />
      <h2>
        {props.random.name} {props.random.surname}
      </h2>
      <button onClick={props.handleClickOnRandom} name="like" disabled={props.disableButton}>Like</button>
      <button onClick={props.handleClickOnRandom} name="next" disabled={props.disableButton}>Next</button>
    </div>
  )
}

export default Random;