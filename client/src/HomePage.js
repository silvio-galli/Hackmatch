import React, { Component } from "react";
import axios from "axios";

class HomePage extends Component {
  render() {
    console.log("candidates", this.state.candodates);
    return (
      <div>
        {this.state.candidates.map(c => (
          <div className="row">
            <div className="col-md-2">
              <img src={c.picUrl} alt="" className="candidate-pic img-fluid" />
            </div>
            <div className="col-md-2">{c.name}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default HomePage;
