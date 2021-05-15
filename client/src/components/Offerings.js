import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Offerings extends Component {
  state = {
    offerings: null,
    waiting: false,
  };

  Download = (e) => {
    this.setState({ waiting: true });
    axios
      .get(`/api/furnace/`)
      .then((res) => {
        this.setState({
          waiting: false,
          offerings: res.data,
        });
        console.log(this.state.offerings)
      })
      .catch((err) => console.log(err));
  };

  render() {
    let isWaiting = <></>;
    let toImage = <></>;
    if (this.state.offerings) {
      toImage = <a download="test.jpg" href={this.state.offerings}>Your Offering</a>;
    }
    if (this.state.waiting === true) {
      isWaiting = <p>please wait</p>;
    }
    return (
      <div>
        <button onClick={this.Download}>Download</button>
        {toImage}
        {isWaiting}
      </div>
    );
  }
}
