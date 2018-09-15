import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import HomePage from "./HomePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/candidates").then(response => {
      console.log("response", response.data);
      this.setState({
        candidates: response.data
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
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
