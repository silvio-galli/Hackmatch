import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
require('dotenv').config({ path: '../../.env' });

function capitalize(str) {
  return str[0].toUpperCase() + str.toLowerCase().slice(1)
}

class NewCandidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubmitting: false,
      redirect: false,
      name: "",
      surname: "",
      newCandidateId: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitting: true
    })
    if (process.env.REACT_APP_GIPHY_API_KEY) {
      let url = "https://api.giphy.com/v1/gifs/random?api_key=" + process.env.REACT_APP_GIPHY_API_KEY + "&tag=cat";
      axios.get(url)
      .then(response => {
        console.log("giphy response -->", response.data)
        let pic = response.data.data.images.fixed_width.url
        axios.post("http://localhost:8000/candidates", {
          name: capitalize(this.state.name),
          surname: capitalize(this.state.surname),
          numberOfLikes: 0,
          numberOfNexts: 0,
          picUrl: pic
        })
        .then(response => {
          console.log(response.data)
          this.setState({
            redirect: true,
            newCandidateId: response.data.id
          }, () => {
            this.props.handleAfterSubmit(response.data)
          })
        })
      })
    } else {
      axios.post("http://localhost:8000/candidates", {
        name: capitalize(this.state.name),
        surname: capitalize(this.state.surname),
        numberOfLikes: 0,
        numberOfNexts: 0,
        picUrl: "https://media3.giphy.com/media/vFKqnCdLPNOKc/200.webp"
      })
      .then(response => {
        console.log(response.data)
        this.setState({
          redirect: true,
          newCandidateId: response.data.id
        }, () => {
          this.props.handleAfterSubmit(response.data)
        })
      })
    }
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={"/candidates/" + this.state.newCandidateId} />
      )
    }

    if (this.state.isSubmitting) {
      return (
        <div>
          <h2>New Candidate</h2>
          <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt=""
          />
          <h6>submitting...</h6>
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit} className="form ml-3">
        <h2>New Candidate</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" placeholder="Enter candidate name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input type="text" className="form-control" name="surname" placeholder="Enter candidate surname" value={this.state.surname} onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-success btn-sm">Submit</button>
      </form>
    )
  }
}

export default NewCandidate;