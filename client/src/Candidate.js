import React from "react";
import axios from "axios";

class Candidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidate: {},
      isLoading: true
    };
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/candidates/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          candidate: response.data,
          isLoading: false
        });
      });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.setState(
        {
          isLoading: true
        },
        () => {
          axios
            .get(
              "http://localhost:8000/candidates/" + this.props.match.params.id
            )
            .then(response => {
              this.setState({
                candidate: response.data,
                isLoading: false
              });
            });
        }
      );
    }
  }

  handleLike() {
    let { candidate } = this.state;
    candidate.numberOfLikes += 1;
    this.setState(
      {
        candidate: candidate
      },
      () => {
        axios
          .patch(
            "http://localhost:8000/candidates/" + this.state.candidate.id,
            {
              numberOfLikes: this.state.candidate.numberOfLikes + 1
            }
          )
          .then(response => {
            console.log("PATCH NUMBER OF LIKES -->", response.data);
          });
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="col-md-6 col-sm-6 col-6">
          <h1>Candidate</h1>
          <img
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt=""
          />
        </div>
      );
    }

    return (
      <div className="col-md-6">
        <h1>Candidate</h1>
        <img src={this.state.candidate.picUrl} alt="" />
        <h2>
          {this.state.candidate.name} {this.state.candidate.surname}
        </h2>
        <button onClick={this.handleLike}>Like</button>
      </div>
    );
  }
}

export default Candidate;
