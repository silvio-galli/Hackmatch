import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import HomePage from "./HomePage";
import Candidate from "./Candidate";
import NewCandidate from "./NewCandidate";
import Random from './Random';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: null,
      isLoading: true,
      random: null,
      randomLoading: false
    };

    this.handleAfterSubmit = this.handleAfterSubmit.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleClickOnRandom = this.handleClickOnRandom.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:8000/candidates?_sort=name&_order=asc")
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

  handleRandom() {
    console.log( "RANDOM" )
    let randNum = Math.floor(Math.random() * this.state.candidates.length);
    this.setState({
      random: this.state.candidates[ randNum ],
      randomLoading: false
    })
  }

  handleClickOnRandom(e) {
    this.setState({
      randomLoading: true
    })
    let field = e.target.name === "like" ? "numberOfLikes" : "numberOfNexts"
    let candidate = {...this.state.random};
    candidate[field] += 1;
    this.setState({
      random: candidate,
      candidates: this.state.candidates.map(c => c.id === this.state.random.id ? candidate : c)
    }, () => {
      axios.patch("http://localhost:8000/candidates/" + this.state.random.id, {[field]: this.state.random[field]})
      .then(response => {
        this.handleRandom();
      })
    })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link>{"  "}
          <Link to="/new-candidate">Add Candidate</Link> {"  "}
          {
            this.state.candidates && <Link to="/random" onClick={this.handleRandom}>Random</Link>
          }
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
            <Route
              path="/random"
              render={ props => (
                <Random
                  {...props}
                  random={this.state.random}
                  handleRandom={this.handleRandom}
                  handleClickOnRandom={this.handleClickOnRandom}
                  disableButton={this.state.randomLoading}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
