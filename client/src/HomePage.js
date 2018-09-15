import React from "react";
import { Link } from "react-router-dom";

const HomePage = props => {
  return (
    <div className="col-md-3 col-sm-3 col-3 pre-scrollable">
      {props.isLoading ? (
        <img
          src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
          alt=""
        />
      ) : (
        props.candidates.map(c => (
          <div key={c.id} className="text-left border-bottom">
            <Link to={"/candidates/" + c.id}>
              {c.name} {c.surname}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
