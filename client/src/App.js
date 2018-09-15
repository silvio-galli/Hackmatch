import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./HomePage";
import Candidate from "./Candidate";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/candidates?_sort=name&_order=asc")
      .then(response => {
        this.setState({
          candidates: response.data,
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new-candidate">Add Candidate</Link>
          <Link to="/random">Random</Link>
        </nav>
        <div className="container">
          <div className="row">
            <Route
              path="/"
              render={props => (
                <HomePage
                  {...props}
                  candidates={this.state.candidates}
                  isLoading={this.state.isLoading}
                />
              )}
            />
            <Route path="/candidates/:id" component={Candidate} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
