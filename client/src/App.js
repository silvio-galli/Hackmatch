import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./HomePage";
import Candidate from "./Candidate";
import NewCandidate from "./NewCandidate";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      isLoading: true
    };

    this.handleAfterSubmit = this.handleAfterSubmit.bind(this)
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

  handleAfterSubmit(newCandidate) {
    let list = this.state.candidates.slice();
    list.push(newCandidate)
    let sortedByName = list.sort((a, b) => {
      if (a.name > b.name) {
        return 1
      } else if (a.name === b.name) {
        return 0
      } else {
        return -1
      }
    })
    this.setState({
      candidates: sortedByName
    })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/new-candidate">Add Candidate</Link> |
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
            <Route
              path="/new-candidate"
              render={(props) => (
                <NewCandidate
                  {...props}
                  handleAfterSubmit={this.handleAfterSubmit}
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
